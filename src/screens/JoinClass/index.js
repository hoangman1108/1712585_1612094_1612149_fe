import nProgress from 'nprogress';
import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';


export default function JoinClass() {
    const history = useHistory();
    const { classes } = useSelector(state => state.class);
    const { me } = useSelector(state => state.auth);


    console.log("history: ", history);
    console.log(history.location.pathname.split('/'));
    const data = classes.find(element => element.id === history.location.pathname.split('/')[3]);
    if (!data) {
        nProgress.start();
    } else {
        nProgress.done();
    }

    console.log("data: ", data);

    const handleJoinClass = () => {
        
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Tham gia lớp học?</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Mã lớp: {data.codeJoin}</Card.Subtitle>
                <Card.Text>
                    Bạn đã được mời tham gia "{data.name}". Bạn đã đăng nhập với tư cách {me.name} ({me.email}).
                </Card.Text>
                <Button variant="primary" onClick={handleJoinClass}>Tham gia</Button>
            </Card.Body>
        </Card>
    )
}
