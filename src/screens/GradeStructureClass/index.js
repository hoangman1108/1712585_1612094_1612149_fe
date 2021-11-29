import nProgress from 'nprogress';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import classService from "../../services/class.service";
import CardAssigment from "./components/CardAssigment";

export default function GradeStructureClass() {
    const history = useHistory();
    const { classes } = useSelector(state => state.class);
    console.log(classes);
    const { me } = useSelector(state => state.auth);
    const pathName = history.location.pathname.split('/');
    const data = classes.find(element => element.id === pathName[2]);
    if (!data) {
        nProgress.start();
    } else {
        nProgress.done();
    }
 
    const [assigmentData, setAssigmentData] = useState([]);

    console.log(data);
    useEffect(() => {
        if (data?.id) {
            const dataUsers = me.role === "teacher" ? data.teachers : data.students;
            const userExisted = dataUsers.find(user => user === me.id);
            if (userExisted) {
                console.log(me);
                classService.getAssigments(data.id)
                .then(response => {
                    console.log("assigments: ", response.data);
                    setAssigmentData(response.data);
                });
            };
        }
    }, [data?.id]);

    const assigmentDelete = (id) => {
        console.log(id);
    }

    const assigmentEdit = (id) => {

    }

    const assigmentAdd = (data) => {

    }

    return (
        <Container>
            <Row span={24} className="text-center">
                <Col>
                    <h2>Grade structure</h2>
                </Col>
            </Row>
            <Row span={24} className="mt-4">
                {assigmentData.map(assigment => {
                    return <CardAssigment
                        classID={data.id}
                        info={assigment}
                        handleAdd={assigmentAdd}
                        handleEdit={assigmentEdit}
                        handleDelete={assigmentDelete}
                        key={assigment.id ? assigment.id : ""}
                    />
                })}
            </Row>
        </Container>
    )
}
