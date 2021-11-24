import nProgress from 'nprogress';
import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import classService from '../../services/class.service';

export default function JoinClass() {
    const history = useHistory();
    const { classes } = useSelector(state => state.class);
    const { me } = useSelector(state => state.auth);
    const [isExistClass, setIsExistClass] = useState(false);

    console.log("history: ", history);
    console.log("classes: ", classes);
    console.log(history.location.pathname.split('/'));
    const pathName = history.location.pathname.split('/');
    const data = classes.find(element => element.id === pathName[3]);
    if (!data) {
        nProgress.start();
    } else {
        nProgress.done();
    }

    data?.codeJoin ? setIsExistClass(true) : setIsExistClass(false);
    console.log("data: ", data);

    const handleJoinClass = () => {
        
    };

    return (
        <Card style={{ width: '18rem' }}>
            {
                isExistClass && (<Card.Body>
                    <Card.Title>Tham gia lớp học?</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Mã lớp: {data.codeJoin}</Card.Subtitle>
                    <Card.Text>
                        Bạn đã được mời tham gia "{data.name}". Bạn đã đăng nhập với tư cách {me.name} ({me.email}).
                    </Card.Text>
                    <Button variant="primary" onClick={handleJoinClass}>Tham gia</Button>
                </Card.Body>)
            }
            {
                !isExistClass && (<Card.Body>
                    <Card.Title>Tham gia lớp học?</Card.Title>
                    <Button variant="primary" onClick={handleJoinClass}>Trang chủ</Button>
                </Card.Body>)
            }
        </Card>
    )
}
