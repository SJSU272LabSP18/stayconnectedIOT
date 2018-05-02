import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchAllNodes, fetchZoneNodes, fetchZoneBarChart} from "../../../actions";
import {withRouter} from "react-router-dom";
import Barchart from "../../charts/Barchart";
import _ from "lodash";
import {subscribeToData} from "./socket";

class Nodes extends Component {
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
    if (this.props.match.params.zoneId) {
      this.props.fetchZoneNodes(this.props.match.params.zoneId).then(() => {
        _.map(this.props.nodes.rows, node => {
          this.setState({
            rows: [...this.state.rows, node]
          });

        });
      });

      var values = {
        zoneId: this.props.match.params.zoneId,
        startTime: '2018-01-28',
        endTime: '2018-12-28'
      };

      //fetch charts based for given  location
      this.props.fetchZoneBarChart(values).then(() => {
        var chartData = this.props.charts.rows[0];
        var array_keys = [];
        var array_values = [];

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
      this.props.fetchAllNodes().then(() => {
        _.map(this.props.nodes.rows, node => {
          this.setState({
            rows: [...this.state.rows, node]
          });

          subscribeToData(node.node_id, (err, data) => {
            this.socketUpdate(data);
          });
        });
      });
    }
  }

  socketUpdate(data) {
    console.log('Node Update: ', JSON.stringify(data));
    let nodes = [...this.state.rows];
    let nodeIndex = nodes.findIndex(node => node.node_id == data.node_id);
    nodes[nodeIndex].temperature = data.temperature;
    nodes[nodeIndex].humidity = data.humidity;
    console.log('Node: ', JSON.stringify(nodes[nodeIndex]));
    this.setState({nodes});
  }

  componentWillUnmount() {

  }

  onDetailClick(nodeId) {
    console.log('Node detail clicked');
    //this.props.history.push('/dashboard/' + nodeId + '/locations');
  }
  renderNodes() {
    return _.map(this.state.rows, node => {
      return (
        <div className="col-md-3" key={node.node_id}>
          <div className="card ">
            <div className="header">
              <h4 className="title">{node.node_name}</h4>
            </div>
            <div className="content">
              <div className="footer">
                <div className="legend">
                  <i className="fa fa-circle text-info" /> ID:{' '}
                  {node.node_address}
                  <br />
                  <i className="fa fa-circle text-danger" /> Address:{''}
                  {node.node_id}
                  <br />
                  <i className="fa fa-circle text-warning" /> Status:{' '}
                  {node.status == 1 ? 'Active' : 'Inactive'}
                  <br />
                  <i className="fa fa-circle text-info" /> Temperature:{' '}
                    {node.temperature}

                  <br />
                  <i className="fa fa-circle text-danger" /> Humidity:{' '}
                    {node.humidity}

                </div>
                <hr />
                <div className="stats">
                  <button
                    className="btn btn-warning"
                    onClick={this.onDetailClick.bind(this, node.node_id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  renderBarChart() {
    console.log(this.state.avgConsumption);
    return (
      <div className="col-md-12">
        {_.isEmpty(this.state.avgConsumption) ? (
          ''
        ) : (
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h4 className="title">Average Data Feed</h4>
                <p className="category">Zones</p>
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
      <div>
        <h1> Nodes</h1>
        <div className="row">
          {this.renderNodes()}
          {this.renderBarChart()}
        </div>
      </div>
    );
  }
}
function mapStateToProps({ nodes, charts }) {
  console.log('charts', charts);
  return { nodes, charts };
}
export default connect(mapStateToProps, {
  fetchAllNodes,
  fetchZoneNodes,
  fetchZoneBarChart
})(withRouter(Nodes));
