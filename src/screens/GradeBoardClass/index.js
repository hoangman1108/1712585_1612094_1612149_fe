import nProgress from "nprogress";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import TabsDetail from "../ClassScreen/components/TabsDetail";
// import makeData from '../DetailClass/components/makeData';
import TableGradeBoard from "./components/TableGradeBoard";
// import { BsFillPersonPlusFill, BsFileEarmarkArrowDownFill } from "react-icons/bs";
import classService from "../../services/class.service";
// import ExportData from '../DetailClass/components/ExportData';
// import Swal from 'sweetalert2';
import ExportData from "./components/ExportData";
import {
  BsFillPersonPlusFill,
  BsFileEarmarkArrowDownFill,
} from "react-icons/bs";
import Swal from "sweetalert2";

export default function GradeBoardClass() {
  const history = useHistory();
  const { classes } = useSelector((state) => state.class);
  const [gradeData, setGradeData] = useState([]);
  const [checkInClass, setCheckInClass] = useState(1);
  const [assignmentData, setAssignmentData] = useState([]);
  const [assignmentId, setAssignmentId] = useState(null);
  const classID = history.location.pathname.split("/")[2];
  const { me } = useSelector((state) => state.auth);
  const [callGetAssigment, setCallGetAssigment] = useState(false);
  const [totalGrade, setTotalGrade] = useState(0);

  const gradeColumns = React.useMemo(
    () => [
      {
        Header: "Grade Board",
        columns: [
          {
            Header: "Student ID",
            accessor: "MSSV",
          },
          {
            Header: "Full Name",
            accessor: "fullName",
          },
          {
            Header: "Point",
            accessor: "point",
          },
          {
            Header: "Action",
          },
          {
            Header: "Edit grade",
          },
        ],
      },
    ],
    []
  );

  const onSelectedAssignment = (e) => {
    const assignmentIDSelected = e.target.value;
    if (assignmentIDSelected !== "default") {
      setAssignmentId(assignmentIDSelected);
      classService
        .getPointsByAssignmentID(classID, assignmentIDSelected)
        .then((response) => {
          const data = response?.data?.points;
          const totalGradeNew = data.reduce((total, obj) => {
            return total + (obj.point || 0);
          }, 0);
          setTotalGrade(totalGradeNew);
          setGradeData([...data]);
        });
    }
  };

  const handleImportGrades = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("classId", classID);
    formData.append("assignmentId", assignmentId);
    classService.importListGrade(formData).then((response) => {
      const status =
        response?.data?.message === "UPLOAD_FILE_STUDENT_SUCCESS"
          ? true
          : false;
      Swal.fire({
        position: "center",
        icon: status ? "success" : "error",
        title: status
          ? "Upload file successfully !!!"
          : "Upload file failed !!!",
        showConfirmButton: false,
        timer: 1500,
      });

      if (status) setCallGetAssigment(!callGetAssigment);
    });
    e.target.value = null;
  };
  useEffect(() => {
    classService.checkUserInClass(classID).then((response) => {
      if (response.data) {
        setCheckInClass(2);
      } else {
        setCheckInClass(3);
      }
    });
  }, []);

  useEffect(() => {
    classService.getAssigments(classID).then((response) => {
      setAssignmentData(response.data);
    });
    if (assignmentId)
      classService
        .getPointsByAssignmentID(classID, assignmentId)
        .then((response) => {
          const data = response?.data?.points;
          const totalGradeNew = data.reduce((total, obj) => {
            return total + (obj.point || 0);
          }, 0);
          setTotalGrade(totalGradeNew);
          setGradeData([...data]);
        });
  }, [callGetAssigment]);

  const data = classes.find((element) => element.id === classID);
  if (!data) {
    nProgress.start();
  } else {
    nProgress.done();
  }

  const renderOps = () => (
    <div>
      <h2>
        Bạn chưa được mời vào lớp này bằng bất kì hình thức nào. Xin hãy quay
        lại khi bạn đã được thêm vào lớp
      </h2>
      <Button
        variant="outline-success"
        onClick={() => {
          history.push("/classes?offset=1&limit=6");
        }}
      >
        Quay lại
      </Button>
    </div>
  );

  if (checkInClass === 1) {
    nProgress.start();
    return <></>;
  }
  nProgress.done();

  return (
    <>
      {checkInClass === 2 ? (
        <Container>
          <TabsDetail />
          <h4 className="mt-3">Thông tin bảng điểm của sinh viên</h4>
          <Row className="my-3">
            <Col>
              <span>Choose assignment: </span>
              <select onChange={onSelectedAssignment}>
                <option value={assignmentId ? assignmentId : "Defaul"}>
                  --- select ---
                </option>
                {assignmentData.map((assignment, index) => (
                  <option key={index} value={assignment.id}>
                    {assignment.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col className="d-flex justify-content-end">
              <ExportData rows={gradeData}></ExportData>
              {me.role === "teacher" && (
                <Button variant="success" style={{ marginLeft: "10px" }}>
                  <input
                    id="import-students"
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={handleImportGrades}
                    hidden
                  />
                  <label
                    for="import-students"
                    className="d-flex align-items-center"
                  >
                    <BsFileEarmarkArrowDownFill
                      style={{ marginRight: "10px", fontSize: "20px" }}
                    />
                    <span>Import</span>
                  </label>
                </Button>
              )}
            </Col>
          </Row>

          {gradeData.length > 0 && (
            <TableGradeBoard columns={gradeColumns} data={gradeData} />
          )}
          <div>
            <label>Total grade: {totalGrade}</label>
          </div>
        </Container>
      ) : (
        renderOps()
      )}
    </>
  );
}