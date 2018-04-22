import React, { Component } from 'react';
import Charts from '../charts';
import NodeCard from '../NodeCard';
import _ from 'lodash';
import io from 'socket.io-client';

const socketUrl = 'localhost:8000';
const socket = io(socketUrl);

class LocationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    };
    this.getLocationData.bind(this);
  }
  initSocket() {
    socket.on('connect', () => {
      console.log('connected');
    });
    this.setState({ socket });
  }
  componentDidMount() {
    this.initSocket();
    this.getLocationData();
  }

  getLocationData() {
    var that = this;
    socket.on('location_data', function(location) {
      var response;
      console.log('New Temperatures: ', location);
      if (location != null) {
        var zones = Promise.all(
          _.map(location).map(msg => {
            _.map(msg).map(zones => {
              that.setState({
                chartData: _.values(zones)
              });
            });
          })
        );
      }
    });
  }

  render() {
    return (
      <div
        className="container shadow-lg p-3 mb-5  rounded"
        style={{ background: '#0d0d26', color: '#FFF' }}
      >
        <NodeCard />
        {this.state.chartData.length == undefined
          ? ''
          : <Charts chartData={this.state.chartData} />}
      </div>
    );
  }
}

export default LocationView;