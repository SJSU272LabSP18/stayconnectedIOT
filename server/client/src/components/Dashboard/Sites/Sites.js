import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllSites } from '../../../actions';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
class Sites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }
  componentDidMount() {
    this.props.fetchAllSites().then(() => {
      _.map(this.props.sites.rows, site => {
        this.setState({
          rows: [...this.state.rows, site]
        });
      });
    });
  }
  onDetailClick(siteId) {
    console.log(siteId);
    this.props.history.push('/dashboard/' + siteId + '/locations');
  }
  renderSites() {
    return _.map(this.state.rows, site => {
      return (
        <div className="col-md-3" key={site.site_id}>
          <div className="card ">
            <div className="header">
              <h4 className="title">{site.site_name}</h4>
            </div>
            <div className="content">
              <div className="footer">
                <div className="legend">
                  <i className="fa fa-circle text-info" /> ID:{' '}
                  {site.site_address}
                  <br />
                  <i className="fa fa-circle text-danger" /> Address:{
                    site.site_id
                  }
                </div>
                <hr />
                <div className="stats">
                  <button
                    className="btn btn-warning"
                    onClick={this.onDetailClick.bind(this, site.site_id)}
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
  render() {
    return <div className="row">{this.renderSites()}</div>;
  }
}
function mapStateToProps({ sites }) {
  console.log(sites);
  return { sites };
}
export default connect(mapStateToProps, { fetchAllSites })(withRouter(Sites));
