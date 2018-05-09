import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllLocations, fetchSiteLocations } from '../../../actions';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Landing from "../../Landing"

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.siteId);

    if (this.props.match.params.siteId) {
      this.props.fetchSiteLocations(this.props.match.params.siteId).then(() => {
        _.map(this.props.locations, location => {
          this.setState({
            rows: [...this.state.rows, location]
          });
        });
      });
    } else {
      this.props.fetchAllLocations().then(() => {
        console.log('All Locations: ' + JSON.stringify(this.props.locations));
        _.map(this.props.locations, location => {
          this.setState({
            rows: [...this.state.rows, location]
          });
        });
      });
    }
  }
  onDetailClick(locationId) {
    console.log(locationId);
    this.props.history.push('/dashboard/locations/' + locationId + '/zones');
  }
  renderLocations() {
    return _.map(this.state.rows, location => {
      return (
        <div className="col-md-3" key={location.location_id}>
          <div className="card ">
            <div className="header">
              <h4 className="title">{location.location_name}</h4>
              <p>Site: {location.site_id}</p>
            </div>
            <div className="content">
              <div className="footer">
                <div className="legend">
                  <i className="fa fa-circle text-info" /> ID:{' '}
                  {location.location_address}
                  <br />
                  <i className="fa fa-circle text-danger" /> Address:{
                    location.location_id
                  }
                </div>
                <hr />
                <div className="stats">
                  <button
                    className="btn btn-warning"
                    onClick={this.onDetailClick.bind(
                      this,
                      location.location_id
                    )}
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

  renderSiteLocation() {}
  render() {
      var auth=this.props.auth;
    return (
        <div>
            {auth?(<div>
                <h1>Locations</h1>
                <div className="row">{this.renderLocations()}</div>
            </div>) : (<Landing/>) }

        </div>

    );
  }
}
function mapStateToProps({ locations, auth }) {
  console.log(locations);
  return { locations, auth };
}
export default connect(mapStateToProps, {
  fetchAllLocations,
  fetchSiteLocations
})(withRouter(Locations));
