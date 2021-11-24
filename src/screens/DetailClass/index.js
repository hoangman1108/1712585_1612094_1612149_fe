import nProgress from 'nprogress';
import React, { useEffect, useState } from 'react'
import { Container, Alert, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import TabsDetail from '../ClassScreen/components/TabsDetail';
import makeData from './components/makeData';
import TableInfoUser from './components/TableInfoUser';
import { BsFillPersonPlusFill } from "react-icons/bs";
import InviteClassModal from './components/InviteClassModal';
import classService from '../../services/class.service';

export default function DetailClass() {
  const history = useHistory();
  const { classes } = useSelector(state => state.class)
  const [studentData, setStudentData] = useState([]);
  const [checkInClass, setCheckInClass] = useState(false);
  const [teacherData, setTeacherData] = useState([]);
  const [isInviteTeacher, setIsInviteTeacher] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const handleCloseInviteModal = () => setShowInviteModal(false);
  const handleShowInviteModal = (inviteObject) => {
    setShowInviteModal(true);
    setIsInviteTeacher(inviteObject === "inviteTeacher" ? true : false);
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

  useEffect(() => {
    classService.detailClass(history.location.pathname.split('/')[2])
      .then(response => {
        setStudentData(makeData(response?.data?.students));
        setTeacherData(makeData(response?.data?.teachers))
      })
    classService.checkUserInClass(history.location.pathname.split('/')[2])
      .then((response) => {
        console.log(response, 'response');
        setCheckInClass(response.data);
      })
  }, [])

  const data = classes.find(element => element.id === history.location.pathname.split('/')[2]);
  if (!data) {
    nProgress.start();
  } else {
    nProgress.done();
  }
  const getInfoClass = () => data;

  // if (!checkInClass) {
  //   return ()
  // }

  const renderOps = () => (<div>
    <h2>Bạn chưa được mời vào lớp này bằng bất kì hình thức nào. Xin hãy quay lại khi bạn đã được thêm vào lớp</h2>
    <Button variant="outline-success" onClick={()=>{ history.push('/classes?offset=1&limit=6')}}>Quay lại</Button>
  </div>)

  return (
    <Container>
      {!checkInClass ? renderOps() : (<><TabsDetail /><h4 className="mt-3">Thông tin lớp học</h4><Alert variant='success'>
        <Row>
          <Col>
            <span>Mã lớp: {data?.name}</span>
          </Col>
          <Col>
            <span>Sĩ số: {data?.students?.length}</span>
          </Col>
        </Row>
      </Alert><Row className="mt-5">
          <Col>
            <h5 className="fw-bold">Danh sách Giáo viên</h5>
          </Col>
          <Col>
            <BsFillPersonPlusFill
              className="h4 float-end"
              name="inviteTeacher"
              onClick={handleShowInviteModal.bind(this, "inviteTeacher")} />
          </Col>
        </Row><TableInfoUser columns={teacherColumns} data={teacherData} /><Row className="mt-5">
          <Col>
            <h5 className="fw-bold">Danh sách sinh viên</h5>
          </Col>
          <Col>
            <BsFillPersonPlusFill
              className="h4 cursor-pointer float-end"
              name="inviteStudent"
              onClick={handleShowInviteModal.bind(this, "inviteStudent")} />
          </Col>
        </Row><TableInfoUser columns={studentColumns} data={studentData} /><InviteClassModal handleClose={handleCloseInviteModal} show={showInviteModal} isInviteTeacher={isInviteTeacher} getInfoClass={getInfoClass} /></>)}
    </Container>
  )
}
