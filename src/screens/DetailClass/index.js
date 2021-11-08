import React from 'react'
import { Container, Alert, Row, Col } from 'react-bootstrap'
import makeData from './components/makeData';
import TableInfoUser from './components/TableInfoUser';

export default function DetailClass() {
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

  const studentData = React.useMemo(() => makeData(100), [])
  const teacherData = React.useMemo(() => makeData(3), [])

  return (
    <Container className="mt-5">
      <h4>Thông tin lớp học</h4>
      <Alert variant='success'>
        <Row>
          <Col>
            <span>Mã lớp: 12A3</span>
          </Col>
          <Col>
            <span>Sĩ số: 33</span>
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
