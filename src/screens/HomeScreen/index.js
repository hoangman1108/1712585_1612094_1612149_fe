import React, { useState } from 'react'
import { Carousel, Button } from 'react-bootstrap'
import { useHistory } from 'react-router';

export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const history = useHistory();

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100 h-img-carousel"
          src="https://cdnb.artstation.com/p/marketplace/presentation_assets/000/121/029/large/file.png?1554353080"
          alt="First slide"
        />
        <Carousel.Caption style={{ top: "0px" }}>
          <span style={{
            color: '#ffffff',
            fontWeight: "bold",
            fontSize: "1.6rem",
            marginRight: "10px"
          }}>Go to class list page |</span>
        <Button
        style={{
          marginTop: "-10px",
        }}
        variant="dark"
        onClick={()=>{
          history.push('/classes?offset=1&limit=6');
        }}
        >Visit</Button>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-img-carousel"
          src="https://wallup.net/wp-content/uploads/2017/11/23/445120-ArseniXC-classroom-building-realistic.jpg"
          alt="Second slide"
        />

        <Carousel.Caption style={{ top: "0px" }}>
        <span style={{
            color: '#ffffff',
            fontWeight: "bold",
            fontSize: "1.6rem",
            marginRight: "10px"
          }}>Login/Register? |</span>
        <Button
        style={{
          marginTop: "-10px",
        }}
        variant="dark"
        onClick={()=>{
          history.push('/auth/login');
        }}
        >Visit</Button>
        </Carousel.Caption>
        
      </Carousel.Item>
      {/* <Carousel.Item>
        <img
          className="d-block w-100 h-img-carousel"
          src="https://biz30.timedoctor.com/images/2021/01/time-management-while-work-from-home.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}
