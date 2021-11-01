import { useEffect, useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import CardClass from './components/CardClass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AddClassModel from './components/AddClassModel';
import './App.css';
import DeleteClassModel from './components/DeleteClassModel';
import ModelShow from './components/ModelShow';
const API_URL = process.env.REACT_APP_BACKEND_URL;


function App() {
  const [showAddModel, setShowAddModel] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [msgError, setMsgError] = useState('');
  const handleCloseAddModel = () => setShowAddModel(false);
  const handleShowAddModel = () => setShowAddModel(true);
  const handleCloseDeleteModel = () => setShowDeleteModel(false);
  const handleShowDeleteModel = (id) => {
    setId(id);
    setShowDeleteModel(true);
  };

  useEffect(() => {
    fetch(`${API_URL}/classes`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      }).then(data => {
        setData(data);
      });
  }, []);

  const createData = (value) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    };
    fetch(`${API_URL}/classes`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.message) {
          setMsgError(result.message);
        } else {
          setData([...data, result]);
        }
      });

  }

  const deleteData = () => {
    fetch(`${API_URL}/classes/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then((result) => {
        if (result.deletedCount) {
          const newData = data.filter((element) => element._id !== id);
          setData(newData);
        }
      });
  }

  const listClass = () => {
    return data.map((element) => {
      return (<Col>
        <CardClass deleteData={deleteData} info={element} showDelete={handleShowDeleteModel} />
      </Col>)
    })
  }

  return (
    <Container>
      <Button variant="outline-success"
        onClick={handleShowAddModel}
        className="mt-5">
        <FontAwesomeIcon icon={faPlusCircle} />{' '}
        Thêm Lớp
      </Button>
      <Row>
        {listClass()}
      </Row>
      <AddClassModel msgError={msgError} createData={createData} handleClose={handleCloseAddModel} show={showAddModel} />
      <DeleteClassModel deleteData={deleteData} handleClose={handleCloseDeleteModel} show={showDeleteModel} />
      {msgError && (<ModelShow message={msgError}/>)}
    </Container>
  );
}

export default App;
