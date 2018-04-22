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
      <h1 align="center">Lab View Made Easy</h1>

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

      <br />
    </div>
  );
};
export default Landing;
