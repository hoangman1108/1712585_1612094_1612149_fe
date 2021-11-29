import nProgress from 'nprogress';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

export default function GradeStructureClass() {
    const history = useHistory();
    const { classes } = useSelector(state => state.class);
    const { me } = useSelector(state => state.auth);
    const pathName = history.location.pathname.split('/');
    const data = classes.find(element => element.id === pathName[2]);
    if (!data) {
        nProgress.start();
    } else {
        nProgress.done();
    }

    console.log(data);
    useEffect(() => {
        if (data?.id) {
            const dataUsers = me.role === "teacher" ? data.teachers : data.students;
            const userExisted = dataUsers.find(user => user === me.id);
            if (userExisted) {
                console.log(me);
            };
        }
    }, [data?.id]);

    return (
        <Container>
            <Row span={24} className="text-center">
                <Col>
                    <h2>Grade structure</h2>
                </Col>
            </Row>
        </Container>
    )
}
