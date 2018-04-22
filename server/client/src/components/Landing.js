import React from 'react';
import img1 from '../img/img1.png';
import img2 from '../img/img2.png';
import img3 from '../img/img3.png';
const styles = {
  width: '100%',
  height: '700px'
};
const Landing = () => {
  return (
    <div className="container-fluid">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src={img1}
              alt="First slide"
              style={styles}
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src={img2}
              alt="Second slide"
              style={styles}
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src={img3}
              alt="Third slide"
              style={styles}
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
      <div className="jumbotron">
        <h1 className="display-4">Lab Monitoring Made Easy!</h1>
        <p className="lead">A bit about the project..</p>

        <p>
          <strong>Scope:</strong> <br />
          Our design may be a Distributed Active Climate Control System for
          large data centers. The server racks are laid out in grids with
          cooling units and lighting units (for maintenance and operation).{' '}
          <br />
          <strong>
            Our system would utilize distributed low cost IoT sensors to perform
            these tasks including:{' '}
          </strong>{' '}
          <br />
          - Ambient Temperature Monitoring <br />
          - HVAC Control (Small servo used to showcase fan operation) <br />
          - Motion Sensing <br />
          - Lighting Control <br />
          <br />
          <strong>Features: </strong>
          <br />
          - Raspberry Pi Computing Module (Parent Node/Stand alone) <br />
          - WiFi MicroController (Optional for increased complexity) (Child
          Node/Stand alone IFFT Device) <br />
          - Redundancy and node failover i.e. all nodes communicate at all times{' '}
          <br />
          - Constrain Resolver to distribute communication load among nodes to
          balance traffic <br />
        </p>
      </div>

      <br />
    </div>
  );
};
export default Landing;
