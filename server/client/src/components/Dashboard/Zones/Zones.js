import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchAllZones,
  fetchLocationZone,
  fetchLocationCharts
} from '../../../actions';
import _ from 'lodash';
import Barchart from '../../charts/Barchart';

class Zones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ],
      rows: [],
      showCharts: true,
      avgConsumption: {}
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.locationId);
    if (this.props.match.params.locationId) {
      //Fetch zones under selected location
      this.props
        .fetchLocationZone(this.props.match.params.locationId)
        .then(() => {
          _.map(this.props.zones.rows, zone => {
            this.setState({
              rows: [...this.state.rows, zone]
            });
          });
        });
      var values = {
        locationId: this.props.match.params.locationId,
        startTime: '2018-01-28',
        endTime: '2018-12-28'
      };
      //fetch charts based for given  location
      this.props.fetchLocationCharts(values).then(() => {
        var chartData = this.props.charts.rows[0];
        var array_keys = new Array();
        var array_values = new Array();

        for (var key in chartData) {
          array_keys.push(key);
          array_values.push(chartData[key]);
        }
        this.setState({
          avgConsumption: {
            labels: array_keys,
            label: 'Avg Consumption',
            datasets: [
              {
                data: array_values,
                backgroundColor: this.state.backgroundColor
              }
            ]
          }
        });
      });
    } else {
      this.props.fetchAllZones().then(() => {
        _.map(this.props.zones.rows, zone => {
          this.setState({
            rows: [...this.state.rows, zone]
          });
        });
      });
    }
  }

  renderZones() {
    return _.map(this.state.rows, zone => {
      return (
        <div className="col-md-3" key={zone.zone_id}>
          <div className="card ">
            <div className="header">
              <h4 className="title">{zone.zone_name}</h4>
              <p>Location Id: {zone.location_id}</p>
            </div>
            <div className="content">
              <div className="footer">
                <div className="legend">
                  <i className="fa fa-circle text-info" /> ID:{' '}
                  {zone.zone_address}
                  <br />
                  <i className="fa fa-circle text-danger" /> Address:{
                    zone.zone_id
                  }
                </div>
                <hr />
                <div className="stats">
                  <button className="btn btn-warning">Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  renderChart() {
    console.log(this.state.avgConsumption);
    return (
      <div className="col-md-12">
        {_.isEmpty(this.state.avgConsumption) ? (
          'Please Check to ensure there are Zones under the given location'
        ) : (
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h4 className="title">Average Data Feed</h4>
                <p className="category">Locations</p>
              </div>
              <div className="content">
                <div id="chartHours" className="ct-chart">
                  <Barchart
                    chartData={this.state.avgConsumption}
                    displayTitle="Avg Consumption"
                  />
                </div>
                <div className="footer">
                  <hr />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  render() {
    return (
      <div className="row">
        {this.renderZones()}
        {this.renderChart()}
      </div>
    );
  }
}
function mapStateToProps({ zones, charts }) {
  return { zones, charts };
}

export default connect(mapStateToProps, {
  fetchAllZones,
  fetchLocationZone,
  fetchLocationCharts
})(Zones);
