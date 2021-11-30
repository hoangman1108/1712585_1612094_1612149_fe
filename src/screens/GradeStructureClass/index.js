import nProgress from "nprogress";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import classService from "../../services/class.service";
import CardAssigment from "./components/CardAssigment";
import TabsDetail from "../ClassScreen/components/TabsDetail";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function GradeStructureClass() {
  const history = useHistory();
  const { classes } = useSelector((state) => state.class);
  const { me } = useSelector((state) => state.auth);
  const pathName = history.location.pathname.split("/");
  const data = classes.find((element) => element.id === pathName[2]);
  if (!data) {
    nProgress.start();
  } else {
    nProgress.done();
  }

  const [assigmentData, setAssigmentData] = useState([]);

  useEffect(() => {
    if (data?.id) {
      const dataUsers = me.role === "teacher" ? data.teachers : data.students;
      const userExisted = dataUsers.find((user) => user === me.id);
      if (userExisted) {
        classService.getAssigments(data.id).then((response) => {
          console.log("assigments: ", response.data);
          setAssigmentData(response.data);
        });
      }
    }
  }, [data?.id]);

  const assigmentDelete = (id) => {
    console.log(id);
    nProgress.start();
    classService.deleteAssigments(id).then((response) => {
      if (response.data === "DELETED") {
        console.log("assigments: ", response.data);
        setAssigmentData(
          assigmentData.filter((assigment) => assigment.id != id)
        );
      } else {
        console.log("deleted failed");
      }
      nProgress.done();
    });
  };

  const assigmentEdit = (data) => {
    console.log("EDIT");
    classService.updateAssigments(data).then((response) => {
      console.log("edit: ", response.data);
    });
  };

  const assigmentAdd = (data) => {
    console.log("ADD");
    classService.addAssigments(data).then((response) => {
      if (response.data?.id) {
        console.log("add: ", response.data);
        setAssigmentData([...assigmentData, response.data]);
      }
    });
  };

  return (
    <Container>
      <TabsDetail />

      <DragDropContext>
        <Droppable droppableId="datnc">
          {(provided) => (
            <Row
              className="mt-4 w-50 mx-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {assigmentData.map((assigment, index) => {
                return (
                  <Draggable
                    key={assigment.id}
                    draggableId={assigment.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        style={{ background: "red" }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <CardAssigment
                          classID={data.id}
                          info={assigment}
                          handleEdit={assigmentEdit}
                          handleDelete={assigmentDelete}
                          key={assigment.id ? assigment.id : ""}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </Row>
          )}
        </Droppable>
      </DragDropContext>
      <Row className="mt-4 w-50 mx-auto">
        {data?.id && (
          <CardAssigment
            classID={data.id}
            handleAdd={assigmentAdd}
            info={{ id: null }}
          />
        )}
      </Row>
    </Container>
  );
}
