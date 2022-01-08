import React, { useEffect } from "react";
import { Container} from "react-bootstrap";
import authService from "../../services/auth.service";
import { useHistory } from 'react-router';

const VerifyAccountScreen = () => {
  const history = useHistory();
  const userID = history.location.pathname.split('/')[4];

  useEffect(() => {
      authService.verifyAccount(userID)
      .then((res) => {
        history.push("/auth/login");
      }).catch((error) => {
        
      });
  }, [])

  return (
    <Container>
      {/* <Row className="mt-5">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          <h1 className="text-success fw-bold text-center rounded">Verify Account</h1>
          
        </Col>
      </Row> */}
    </Container>
  );
};

export default VerifyAccountScreen;
