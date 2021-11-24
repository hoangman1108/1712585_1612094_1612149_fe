import { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

import CardClass from './components/CardClass';
import AddClassModel from './components/AddClassModel';
import ModelShow from './components/ModelShow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import CustomPagination from './components/CustomPagination';
import { useHistory } from 'react-router';

function ClassScreen() {
  const [showAddModel, setShowAddModel] = useState(false);
  const handleCloseAddModel = () => setShowAddModel(false);
  const handleShowAddModel = () => setShowAddModel(true);

  const { classes } = useSelector(state => state.class);
  const { role } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const history = useHistory();

  const offset = history.location.search.split('&')[0].split('=')[1];
  const limit = history.location.search.split('&')[1].split('=')[1];
  const listClass = () => {
    const newClass = classes.slice(limit*(offset - 1), limit*(offset));
    return newClass.map((element, index) => {
      return (<Col className="mt-3" xs={4} key={index}>
        <CardClass info={element} />
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
      <div className="text-center mt-3">
        <CustomPagination offset={offset} limit={limit} length={classes.length} history={history} />
      </div>
      <AddClassModel handleClose={handleCloseAddModel} show={showAddModel} />
      {message && (<ModelShow message={message} />)}
    </Container>
  );
}

export default ClassScreen;
