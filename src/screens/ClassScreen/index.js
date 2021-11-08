import { useEffect, useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

import CardClass from './components/CardClass';
import AddClassModel from './components/AddClassModel';
import DeleteClassModel from './components/DeleteClassModel';
import ModelShow from './components/ModelShow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createClass, getListClass } from '../../redux/actions/class.action';

function ClassScreen() {
  const [showAddModel, setShowAddModel] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [id, setId] = useState('');
  const [msgError, setMsgError] = useState('');
  const handleCloseAddModel = () => setShowAddModel(false);
  const handleShowAddModel = () => setShowAddModel(true);
  const handleCloseDeleteModel = () => setShowDeleteModel(false);
  const dispatch = useDispatch();

  const { classes } = useSelector(state => state.class)
  const { role } = useSelector(state => state.auth)
  const handleShowDeleteModel = (id) => {
    setId(id);
    setShowDeleteModel(true);
  };

  useEffect(() => {
    dispatch(getListClass());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const createData = (value) => {
  //   // const requestOptions = {
  //   //   method: 'POST',
  //   //   headers: { 'Content-Type': 'application/json' },
  //   //   body: JSON.stringify(value)
  //   // };
  //   // fetch(`${API_URL}/classes`, requestOptions)
  //   //   .then(response => response.json())
  //   //   .then(result => {
  //   //     if (result.message) {
  //   //       setMsgError(result.message);
  //   //     } else {
  //   //       setData([...data, result]);
  //   //     }
  //   //   });

  //   dispatch(createClass(value));

  // }

  const listClass = () => {
    return classes.map((element, index) => {
      return (<Col className="mt-3" xs={4} key={index}>
        <CardClass info={element} showDelete={handleShowDeleteModel} />
      </Col>)
    })
  }

  return (
    <Container>
      {
        role === 'teacher' && (<Button variant="outline-success"
          onClick={handleShowAddModel}
          className="mt-5">
          <FontAwesomeIcon icon={faPlusCircle} />{' '}
          Thêm Lớp
        </Button>)
      }
      <Row>
        {listClass()}
      </Row>
      <AddClassModel msgError={msgError} handleClose={handleCloseAddModel} show={showAddModel} />
      {/* <DeleteClassModel deleteData={deleteData} handleClose={handleCloseDeleteModel} show={showDeleteModel} /> */}
      {msgError && (<ModelShow message={msgError} />)}
    </Container>
  );
}

export default ClassScreen;
