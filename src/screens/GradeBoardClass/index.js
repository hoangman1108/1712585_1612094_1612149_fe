import nProgress from 'nprogress';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import TabsDetail from '../ClassScreen/components/TabsDetail';
// import makeData from '../DetailClass/components/makeData';
import TableGradeBoard from './components/TableGradeBoard';
// import { BsFillPersonPlusFill, BsFileEarmarkArrowDownFill } from "react-icons/bs";
import classService from '../../services/class.service';
// import ExportData from '../DetailClass/components/ExportData';
// import Swal from 'sweetalert2';


export default function GradeBoardClass() {
  const history = useHistory();
  const { classes } = useSelector(state => state.class);
  const [gradeData, setGradeData] = useState([]);
  const [checkInClass, setCheckInClass] = useState(1);
  const [assignmentData, setAssignmentData] = useState([]);
  const classID = history.location.pathname.split('/')[2];

  const gradeColumns = React.useMemo(
    () => [
      {
        Header: 'Grade Board',
        columns: [
          {
            Header: 'Student ID',
            accessor: 'MSSV',
          },
          {
            Header: 'Full Name',
            accessor: 'fullName',
          },
          {
            Header: 'Point',
            accessor: 'point',
          },
          {
            Header: 'Action'
          }
        ],
      }
    ],
    []
  )

  const onSelectedAssignment = (e) => {
      console.log("vao day");
      const assignmentID = e.target.value;
      if (assignmentID !== "default") {
        classService.getPointsByAssignmentID(classID, assignmentID)
        .then((response) => {
            console.log(response);
            setGradeData(response?.data?.points);
            console.log(gradeData);
        });
      }
  }
  
  useEffect(() => {
    classService.checkUserInClass(classID)
      .then((response) => {
        if(response.data){
          setCheckInClass(2);
        }else{
          setCheckInClass(3);
        }
      });
  }, [])

  useEffect(() => {
    console.log("vo day ne");
    classService.getAssigments(classID).then((response) => {
        setAssignmentData(response.data);
    });
  }, [])

  const data = classes.find(element => element.id === classID);
  if (!data) {
    nProgress.start();
  } else {
    nProgress.done();
  }

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
          <h4 className="mt-3">Thông tin bảng điểm của sinh viên</h4>
          <Row className="my-3">
              <Col>
                <span>Choose assignment: </span>
                <select onChange={onSelectedAssignment} >
                    <option value="default">--- select ---</option>
                    {
                        assignmentData.map((assignment, index) => (
                            <option key={index} 
                                    value={assignment.id}
                                    >
                                {assignment.name}
                            </option>
                        ))
                    }
                </select>
              </Col>
          </Row>

          {
              gradeData.length > 0 && (
                <TableGradeBoard columns={gradeColumns} data={gradeData} />
              )
          }
          
        </Container>) : renderOps()
      }
    </>
  )
}
