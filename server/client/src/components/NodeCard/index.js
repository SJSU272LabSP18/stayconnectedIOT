import React, { Component } from 'react';

class NodeCard extends Component {
  render() {
    return (
      <div classname="row">
        <br />

        <div className="col-sm-3 card text-white bg-dark ">
          <div className="card-header">Zone 1</div>
          <div className="card-body">
            <h5 className="card-title"> Avg Temp: 5</h5>
            <p className="card-text">
              Active: 3 <br />
              Inactive: 2<br />
            </p>
            <button className="btn btn-info">Details</button>
          </div>
        </div>
      </div>
    );
  }
}
export default NodeCard;
