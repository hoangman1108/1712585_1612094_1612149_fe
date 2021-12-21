/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from 'nprogress';
import React, { useEffect, useState } from 'react'
import { Container, Alert, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import TabsDetail from '../ClassScreen/components/TabsDetail';
import makeData from './components/makeData';
import TableInfoUser from './components/TableInfoUser';
import { BsFillPersonPlusFill, BsFileEarmarkArrowDownFill } from "react-icons/bs";
import InviteClassModal from './components/InviteClassModal';
import classService from '../../services/class.service';
import ExportData from './components/ExportData';
import Swal from 'sweetalert2';

export default function DetailClass() {
  const history = useHistory();
  const { classes } = useSelector(state => state.class)
  const { me } = useSelector(state => state.auth)
  const [studentData, setStudentData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [studentRealData, setStudentRealData] = useState([]);
  const [checkInClass, setCheckInClass] = useState(1);
  const [isInviteTeacher, setIsInviteTeacher] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const classID = history.location.pathname.split('/')[2];

  const handleCloseInviteModal = () => setShowInviteModal(false);

  const handleShowInviteModal = (inviteObject) => {
    setShowInviteModal(true);
    setIsInviteTeacher(inviteObject === "inviteTeacher" ? true : false);
  }
  
  const handleImportStudents = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("classId", classID);
    classService.importLstStudentReal(formData)
      .then(response => {
        const status = response?.data?.message === "UPLOAD_FILE_STUDENT_SUCCESS" ? true : false;
        Swal.fire({
          position: 'center',
          icon: status ? 'success' : 'error',
          title: status ? 'Upload file successfully !!!' : 'Upload file failed !!!',
          showConfirmButton: false,
          timer: 1500
        });

        if (status) callGetLstStudentsReal(classID);
      });
    e.target.value = null;
  }

  const studentColumns = React.useMemo(
    () => [
      {
        Header: 'Students',
        columns: [
          {
            Header: 'Student ID',
            accessor: 'mssv',
          },
          {
            Header: 'Full Name',
            accessor: 'name',
          }
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Birth day',
            accessor: 'dob',
          },
          {
            Header: 'Gender',
            accessor: 'gender',
          },
          {
            Header: 'Roles',
            accessor: 'role',
          },
        ],
      },
    ],
    []
  )

  const teacherColumns = React.useMemo(
    () => [
      {
        Header: 'Teachers',
        columns: [
          {
            Header: 'Teacher ID',
            accessor: 'mssv',
          },
          {
            Header: 'Full Name',
            accessor: 'name',
          }
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Birth day',
            accessor: 'dob',
          },
          {
            Header: 'Gender',
            accessor: 'gender',
          },
          {
            Header: 'Roles',
            accessor: 'role',
          },
        ],
      },
    ],
    []
  )

  const studentRealColumns = React.useMemo(
    () => [
      {
        Header: 'Students',
        columns: [
          {
            Header: 'MSSV',
            accessor: 'MSSV',
          },
          {
            Header: 'Full Name',
            accessor: 'fullName',
          }
        ],
      }
    ],
    []
  )

  useEffect(() => {
    classService.detailClass(classID)
      .then(response => {
        setStudentData(makeData(response?.data?.students));
        setTeacherData(makeData(response?.data?.teachers))
      })
    classService.checkUserInClass(classID)
      .then((response) => {
        if(response.data){
          setCheckInClass(2);
        }else{
          setCheckInClass(3);
        }
      })
      callGetLstStudentsReal(classID);

  }, [])

  const callGetLstStudentsReal = (classID) => {
    classService.getLstStudentsReal(classID)
    .then(response => {
      setStudentRealData(makeData(response.data.data));
    })
  }

  const data = classes.find(element => element.id === classID);
  if (!data) {
    nProgress.start();
  } else {
    nProgress.done();
  }
  const getInfoClass = () => data;

  const renderOps = () => (<div>
    <h2>Bạn chưa được mời vào lớp này bằng bất kì hình thức nào. Xin hãy quay lại khi bạn đã được thêm vào lớp</h2>
    <Button variant="outline-success" onClick={() => { history.push('/classes?offset=1&limit=6') }}>Quay lại</Button>
  </div>)

  if(checkInClass === 1){
    nProgress.start();
    return (<></>);
  }
  nProgress.done();

  return (
    <>
      {
        checkInClass === 2 ? (<Container>
          <TabsDetail />
          <h4 className="mt-3">Thông tin lớp học</h4>
          <Alert variant='success'>
            <Row>
              <Col>
                <span>Mã lớp: {data?.name}</span>
              </Col>
              <Col>
                <span>Sĩ số: {data?.students?.length}</span>
              </Col>
            </Row>
          </Alert>

          <Row className="mt-5 mb-2">
            <Col>
              <h5 className="fw-bold">Danh sách giáo viên</h5>
            </Col >
            <Col className="d-flex justify-content-end">
              {
                me.role === "teacher" && (
                  <Button variant="success" 
                          name="inviteTeacher" 
                          onClick={handleShowInviteModal.bind(this, "inviteTeacher")}
                          style={{ marginLeft: '10px' }}
                  >
                    <div className="d-flex align-items-center">
                      <BsFillPersonPlusFill style={{ marginRight: '10px', fontSize: '20px' }} />
                      <span>Invite</span>
                    </div>
                  </Button>
                )
              }
            </Col>
            
          </Row>
          <TableInfoUser columns={teacherColumns} data={teacherData} />


          <Row className="mt-5 mb-2">
            <Col>
              <h5 className="fw-bold">Danh sách sinh viên của lớp học</h5>
            </Col>
            <Col className="d-flex justify-content-end">
              <ExportData rows={studentRealData}></ExportData>
              {
                me.role === "teacher" && (
                  <Button variant="success" 
                          style={{ marginLeft: '10px' }}
                  >
                    <input  id="import-students" 
                            type="file" 
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                            onChange={handleImportStudents}
                            hidden />
                    <label for="import-students" className="d-flex align-items-center">
                      <BsFileEarmarkArrowDownFill style={{ marginRight: '10px', fontSize: '20px' }} />
                      <span>Import</span>
                    </label>
                  </Button>
                )
              }

            </Col>
          </Row>
          <TableInfoUser columns={studentRealColumns} data={studentRealData} />
          
          <Row className="mt-5 mb-2">
            <Col>
              <h5 className="fw-bold">Danh sách sinh viên tham gia lớp học</h5>
            </Col>
            <Col className="d-flex justify-content-end">
              <ExportData rows={studentData} lstKeysRemove={['password', 'passwordSalt', 'id']}></ExportData>
              {
                me.role === "teacher" && (
                  <Button variant="success" 
                          name="inviteStudent" 
                          onClick={handleShowInviteModal.bind(this, "inviteStudent")}
                          style={{ marginLeft: '10px' }}
                  >
                    <div className="d-flex align-items-center">
                      <BsFillPersonPlusFill style={{ marginRight: '10px', fontSize: '20px' }} />
                      <span>Invite</span>
                    </div>
                  </Button>
                )
              }

            </Col>
          </Row>
          <TableInfoUser columns={studentColumns} data={studentData} />
          
          <InviteClassModal handleClose={handleCloseInviteModal} show={showInviteModal} isInviteTeacher={isInviteTeacher} getInfoClass={getInfoClass} />
        </Container>) : renderOps()
      }
    </>
  )
}
