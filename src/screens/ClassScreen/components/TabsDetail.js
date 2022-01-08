import React from 'react'
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function TabsDetail() {
  const { me } = useSelector((state) => state.auth);
  const history = useHistory();
  const currentPath = history.location.pathname.split('/')[3];
  const handleChangePage = (path) => {
    if (currentPath === path) {
      return;
    }
    history.push(history.location.pathname.replace(currentPath, path));
  }
  return (
    <div>
      <Tabs defaultActiveKey={currentPath} 
            onSelect={(k) => handleChangePage(k)} 
            id="uncontrolled-tab-example" 
            className="my-3"
        >
        <Tab eventKey="detail" title="Detail"></Tab>
        <Tab eventKey="discuss" title="Discuss"></Tab>
        {
          me && me?.role === "teacher" ? <Tab eventKey="grade" title="Grade Structure"></Tab> : ""
        }
        <Tab eventKey="grade-board" title="Grade Board"></Tab>
      </Tabs>
    </div>

  )
}
