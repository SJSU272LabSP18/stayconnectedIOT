import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchAllSites} from "../../../actions";
import {withRouter} from "react-router-dom";
import _ from "lodash";
import Landing from "../../Landing"
import cookie from "react-cookies";

class Sites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      changeState:false,
      accessToken: cookie.load('accessToken')
    };
  }
  componentDidMount() {
    this.props.fetchAllSites(this.state.accessToken).then(() => {
      _.map(this.props.sites, site => {
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
    renderLogout(){
        var self=this;
    setTimeout(function () {
        self.props.history.push('/Login')
    },2000)
    }

  renderSites() {

        return _.map(this.state.rows, site => {
            return (
                <div className="col-md-3" key={site.site_id} id={site.site_id}>
                    <div className="card ">
                        <div className="header">
                            <h4 className="title">{site.site_name}</h4>
                        </div>
                        <div className="content">
                            <div className="footer">
                                <div className="legend">
                                    <i className="fa fa-circle text-info"/> ID:{' '}
                                    {site.site_address}
                                    <br/>
                                    <i className="fa fa-circle text-danger"/> Address:{
                                    site.site_id
                                }
                                </div>
                                <hr/>
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
      var auth=this.props.auth;
    return (
      <div>
          {auth?(<div> <h1> Sites</h1> <div className="row"> {this.renderSites()}</div></div>) : (<Landing/>) }

      </div>
    );
  }//    {auth ? this.renderSites():<Landing/>}
}
function mapStateToProps(state) {
  console.log(state);
  return { sites:state.sites,
  auth:state.auth};
}
export default connect(mapStateToProps, { fetchAllSites })(withRouter(Sites));
