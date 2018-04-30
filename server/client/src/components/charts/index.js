import React, { Component } from 'react';
import Barchart from './Barchart';
import Piechart from './Piechart';
import Linechart from './Linechart';
import Doughnutchart from './Doughnutchart';
import _ from 'lodash';
class Charts extends Component {
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
      chartData: {},
      barchartData: {
        temperature: [],
        zones: []
      },
      temperatureData: {
        labels: []
      },
      activeData: {
        active: '',
        inactive: '',
        labels: []
      },
      PowerData: {
        power: '',
        zones: [],
        labels: []
      },
      avgPower: {
        avg: [],
        time: []
      }
    };
    this.chartData.bind(this);
    this.setTemperatureData.bind(this);
    this.setActiveData.bind(this);
    this.setPowerData.bind(this);
    this.setAvgPower.bind(this);
  }
  setAvgPower() {
    this.setState({
      avgPower: {
        labels: this.state.avgPower.time,
        label: ' Avg Power Consumption',
        datasets: [
          {
            data: this.state.avgPower.avg,
            backgroundColor: this.state.backgroundColor
          }
        ]
      }
    });
    console.log(this.state.avgPower);
  }
  setPowerData() {
    this.setState({
      PowerData: {
        labels: this.state.PowerData.zones,
        label: ' Power Consumption',
        datasets: [
          {
            data: this.state.PowerData.power,
            backgroundColor: this.state.backgroundColor
          }
        ]
      }
    });
  }
  setActiveData() {
    this.setState({
      activeData: {
        labels: this.state.barchartData.zones,
        label: 'Active Data',
        datasets: [
          {
            data: this.state.activeData.active,
            backgroundColor: this.state.backgroundColor
          }
        ]
      }
    });
  }
  setTemperatureData() {
    this.setState({
      temperatureData: {
        labels: this.state.barchartData.zones,
        label: 'Temperature Data',
        datasets: [
          {
            data: this.state.barchartData.temperature,
            backgroundColor: this.state.backgroundColor
          }
        ]
      }
    });
  }
  async chartData() {
    var zones = [];
    var temp = [];
    var active = [];
    var inactive = [];
    var power = [];
    var avg_power = 0;

    let result = await Promise.all(
      _.map(this.state.chartData).map(async data => {
        await zones.push(data.name);
        await temp.push(data.temp);
        await active.push(data.active);
        await inactive.push(data.inactive);
        await power.push(data.power_usage);
        await (avg_power = avg_power + data.power_usage);

        return [zones, temp];
      })
    );
    await this.setState({
      barchartData: {
        temperature: temp,
        zones: zones
      }
    });
    await this.setState({
      activeData: {
        active: active,
        inactive: inactive,
        zones: zones
      }
    });
    await this.setState({
      PowerData: {
        power: power,
        zones: zones
      }
    });
    avg_power = avg_power / this.state.chartData.length;
    console.log(avg_power);
    await this.setState({
      avgPower: {
        avg: [20, 20],
        time: [1, 2]
      }
    });
    this.setAvgPower();
    this.setTemperatureData();
    this.setPowerData();
    this.setActiveData();
  }
  componentDidMount() {
    if (this.props.chartData) {
      this.setState(
        {
          chartData: this.props.chartData
        },
        () => {
          this.chartData();
        }
      );
    }
  }

  render() {
    return (
      <div className="container">
        <br />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                {this.state.avgPower.label ? (
                  <Linechart
                    chartData={this.state.avgPower}
                    displayTitle={this.state.avgPower.label}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body ">
                {this.state.activeData.labels ? (
                  <Piechart
                    chartData={this.state.activeData}
                    displayTitle={this.state.activeData.label}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                {this.state.temperatureData.labels.length != 0 ? (
                  <Barchart
                    chartData={this.state.temperatureData}
                    displayTitle={this.state.temperatureData.label}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                {this.state.PowerData.labels ? (
                  <Doughnutchart
                    chartData={this.state.PowerData}
                    displayTitle={this.state.PowerData.label}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}
export default Charts;
