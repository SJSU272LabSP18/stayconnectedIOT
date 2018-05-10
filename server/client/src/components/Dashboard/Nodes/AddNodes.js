import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchNoaaList, onSubscribeClick } from '../../../actions';
import _ from 'lodash';

class AddNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }
  componentDidMount() {
    if (this.props.match.params.zoneId) {
      this.props.fetchNoaaList(this.props.match.params.zoneId).then(() => {
        _.map(this.props.noaa, noaa => {
          this.setState({
            rows: [...this.state.rows, noaa]
          });
        });
      });
    }
  }
  SubscribeClick(value) {
    var id = this.props.match.params.zoneId;
    this.props.onSubscribeClick(value).then(() => {
      this.props.history.push(`/dashboard/zones/${id}/nodes`);
    });
  }
  renderNoaa() {
    return _.map(this.state.rows, noaa => {
      return (
        <div className="col-md-3" key={noaa.id}>
          <div className="card ">
            <div className="header">
              <h4 className="title">{noaa.name}</h4>
            </div>
            <div className="content">
              <div className="footer">
                <div className="legend">
                  <i className="fa fa-circle text-info" /> ID: {noaa.id}
                  <br />
                  <i className="fa fa-circle text-info" /> Data Coverage:{' '}
                  {noaa.datacoverage}
                  <br />
                  <i className="fa fa-circle text-danger" /> Location:{' '}
                  {noaa.latitude},{noaa.longitude} {noaa.elevationUnit}
                </div>
                <hr />
                <div className="stats">
                  <button
                    className="btn btn-warning"
                    onClick={this.SubscribeClick.bind(this, noaa)}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  goBack(id) {
    this.props.history.push(`/dashboard/zones/${id}/nodes`);
  }
  render() {
    return (
      <div>
        <button
          className="btn btn-warning"
          onClick={this.goBack.bind(this, this.props.match.params.zoneId)}
        >
          Back
        </button>
        <h1> List Of Noaa </h1>
        <div className="row">{this.renderNoaa()}</div>
      </div>
    );
  }
}
function mapStateToProps({ noaa }) {
  console.log('Noaa', noaa);
  return { noaa };
}
export default connect(mapStateToProps, {
  fetchNoaaList,
  onSubscribeClick
})(withRouter(AddNode));
