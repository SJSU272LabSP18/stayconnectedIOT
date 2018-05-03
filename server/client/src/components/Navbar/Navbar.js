import React, {Component} from "react";
import imagine from "../../assets/img/sidebar-3.jpg";
import "./navbar.css";

class Navbar extends Component {
    render() {
        return (
            <div className="container">
                <div className="sidebar" data-color="blue" data-image={imagine}>
                    <div className="sidebar-wrapper">
                        <div className="nav" id="nav-logo">
                            <a href="/" style={{color: '#FFF'}}>
                                <img
                                    src="https://user-images.githubusercontent.com/10326883/36414375-e9339856-15d6-11e8-9bbd-035581f8416e.jpg"/>
                                {'   '}
                                StayConnected
                            </a>
                        </div>
                        <br />

                        <div className="nav" id="nav-dashboard">
                            <a href="/dashboard/sites" style={{color: '#FFF'}}>
                                <i className="pe-7s-map-marker"/>
                                Sites
                            </a>
                        </div>

                        <div className="nav" id="nav-dashboard">
                            <a href="/dashboard/locations" style={{color: '#FFF'}}>
                                <i className="pe-7s-note2"/>
                                Locations
                            </a>
                        </div>

                        <div className="nav" id="nav-dashboard">
                            <a href="/dashboard/zones" style={{color: '#FFF'}}>
                                <i className="pe-7s-science"/>
                                Zones
                            </a>
                        </div>

                        <div className="nav" id="nav-dashboard">
                            <a href="/dashboard/nodes" style={{color: '#FFF'}}>
                                <i className="pe-7s-graph"/>
                                Nodes
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Navbar;