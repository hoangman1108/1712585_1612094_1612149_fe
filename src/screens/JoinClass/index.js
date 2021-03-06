import nProgress from 'nprogress';
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import classService from '../../services/class.service';

export default function JoinClass() {
    const history = useHistory();
    const { classes } = useSelector(state => state.class);
    const { me } = useSelector(state => state.auth);
    const [isExistClass, setIsExistClass] = useState(false);

    const pathName = history.location.pathname.split('/');
    const data = classes.find(element => element.id === pathName[3]);
    if (!data) {
        nProgress.start();
    } else {
        nProgress.done();
    }

    useEffect(() => {
        setIsExistClass(!!data?.codeJoin);
        if (data?.codeJoin) {
            const dataUsers = me.role === "teacher" ? data.teachers : data.students;
            const userExisted = dataUsers.find(user => user === me.id);
            if (userExisted) window.location.href = `/classes/${data.id}/detail`;
        }
    }, [data?.codeJoin]);

    const handleJoinClass = () => {
        if (isExistClass) {
            const dataInput = {
                classId: data.id,
                userId: me.id
            }
            classService.joinClass(dataInput)
                .then((res) => {
                    window.location.href = `/classes/${dataInput.classId}/detail`;
                }, (error) => {
                    const message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(message);
                });
        } else {
            window.location.href = '/';
        }
    };

    return (
        <Card className="mx-auto" style={{ width: '18rem', marginTop: '10rem' }}>
            {
                isExistClass && (<Card.Body>
                    <Card.Title>Tham gia l???p h???c?</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">M?? l???p: {data.codeJoin}</Card.Subtitle>
                    <Card.Text>
                        B???n ???? ???????c m???i tham gia "{data.name}". B???n ???? ????ng nh???p v???i t?? c??ch {me.name} ({me.email}).
                    </Card.Text>
                    <Button variant="primary" onClick={handleJoinClass}>Tham gia</Button>
                </Card.Body>)
            }
            {
                !isExistClass && (<Card.Body>
                    <Card.Title>Kh??ng t??m th???y l???p c???n tham gia</Card.Title>
                    <Button variant="primary" onClick={handleJoinClass}>Trang ch???</Button>
                </Card.Body>)
            }
        </Card>
    )
}
