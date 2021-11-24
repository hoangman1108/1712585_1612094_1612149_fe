import nProgress from 'nprogress';
import React, { useEffect, useState } from 'react'
import { Container, Alert, Row, Col } from 'react-bootstrap';
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
  const { me } = useSelector(state => state.auth)
  const [studentData, setStudentData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [isInviteTeacher, setIsInviteTeacher] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const handleCloseInviteModal = () => setShowInviteModal(false);
  const handleShowInviteModal = (inviteObject) => {
    setShowInviteModal(true);
    setIsInviteTeacher(inviteObject === "inviteTeacher" ? true : false);
  }

  useEffect(() => {
    classService.detailClass(history.location.pathname.split('/')[2])
      .then(response => {
        setStudentData(makeData(response?.data?.students));
        setTeacherData(makeData(response?.data?.teachers))
      })
  }, [])
  const data = classes.find(element => element.id === history.location.pathname.split('/')[2]);
  console.log(data);
  if (!data) {
    nProgress.start();
  } else {
    nProgress.done();
  }
  const getInfoClass = () => data;


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

  return (
    <Container>
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

      <Row className="mt-5">
        <Col>
          <h5 className="fw-bold">Danh sách Giáo viên</h5>
        </Col>
        {
          me.role === "teacher" && (<Col>
            <BsFillPersonPlusFill
              className="h4 float-end"
              name="inviteTeacher"
              onClick={handleShowInviteModal.bind(this, "inviteTeacher")}
            />
          </Col>)
        }
      </Row>
      <TableInfoUser columns={teacherColumns} data={teacherData} />


      <Row className="mt-5">
        <Col>
          <h5 className="fw-bold">Danh sách sinh viên</h5>
        </Col>
        <Col>
          {
            me.role === "teacher" && (<BsFillPersonPlusFill
              className="h4 cursor-pointer float-end"
              name="inviteStudent"
              onClick={handleShowInviteModal.bind(this, "inviteStudent")}
            />
            )
          }
          
        </Col>
      </Row>
      <TableInfoUser columns={studentColumns} data={studentData} />

      <InviteClassModal handleClose={handleCloseInviteModal} show={showInviteModal} isInviteTeacher={isInviteTeacher} getInfoClass={getInfoClass} />
    </Container>
  )
}
