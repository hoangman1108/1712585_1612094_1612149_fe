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
          src="https://media.edutopia.org/styles/responsive_2880px_16x9/s3/masters/d7_images/cover_media/miller-169hero-selfmanage-getty.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 style={{
            color: '#198754',
            fontWeight: "bold",
          }}>Đến trang danh sách lớp</h3>
        <Button
        style={{
          marginBottom: "300px",
        }}
        variant="success"
        
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
          src="https://biz30.timedoctor.com/images/2021/01/time-management-while-work-from-home.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
        <h3 style={{
            fontWeight: "bold",
            color: '#198754'
          }}>Đăng nhập/Đăng ký?</h3>
        <Button
        style={{
          marginBottom: "300px",
        }}
        variant="success"
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
