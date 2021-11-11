import nProgress from 'nprogress';
import React, { useEffect, useState } from 'react'
import { Container, Alert, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import userService from '../../services/user.service';
import TabsDetail from '../ClassScreen/components/TabsDetail';
import makeData from './components/makeData';
import TableInfoUser from './components/TableInfoUser';

export default function DetailClass() {
  const history = useHistory();
  const { classes } = useSelector(state => state.class)
  const [studentData, setStudentData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  console.log(teacherData, 'teacherData');
  useEffect(() => {
    userService.getUserByRole("student")
      .then((response) => {
        setStudentData(makeData(response?.data))
      });
    userService.getUserByRole("teacher")
      .then((response) => {
        setTeacherData(makeData(response?.data))
      });
  }, [])

  const data = classes.find(element => element.id === history.location.pathname.split('/')[2]);
  if (!data) {
    nProgress.start();
  } else {
    nProgress.done();
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

  console.log(data?.students);


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
      <h5 className="mt-5 fw-bold">Danh sách Giáo viên</h5>
      <TableInfoUser columns={teacherColumns} data={teacherData} />

      <h5 className="mt-5 fw-bold">Danh sách sinh viên</h5>
      <TableInfoUser columns={studentColumns} data={studentData} />
    </Container>
  )
}
