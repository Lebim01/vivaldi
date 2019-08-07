import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

    state = {
        miniMenu: false
    }

    toggleMenu(){
        const { miniMenu } = this.state

        $("#main-wrapper").toggleClass("mini-sidebar");
        if ($("#main-wrapper").hasClass("mini-sidebar")) {
            $(".sidebartoggler").prop("checked", !0);
            $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
        }
        else {
            $(".sidebartoggler").prop("checked", !1);
            $("#main-wrapper").attr("data-sidebartype", "full");
        }
    }

    render() {

        // eslint-disable-next-line
        const { children, ...attributes } = this.props;

        return (
            <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                <div className="navbar-header">
                    { /* <!-- This is for the sidebar toggle which is visible on mobile only --> */ }
                    <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
                        <i className="fas fa-bars"></i>
                    </a>
                    {/*
                    <!-- ============================================================== -->
                    <!-- Logo -->
                    <!-- ============================================================== -->
                    */}
                    <a className="navbar-brand" href="index.html">
                        {/*<!-- Logo icon -->*/}
                        <b className="logo-icon">
                            {/*
                            <!--You can put here icon as well // <i className="wi wi-sunset"></i> //-->
                            <!-- Dark Logo icon -->
                            */}
                            <img src="../../assets/img/LOGO-ICON.png" alt="homepage" className="dark-logo" height="30" />
                            {/*<!-- Light Logo icon -->*/}
                            <img src="../../assets/img/LOGO-ICON.png" alt="homepage" className="light-logo" height="30" />
                        </b>
                        {/*
                        <!--End Logo icon -->
                        <!-- Logo text -->
                        */}
                        <span className="logo-text">
                            {/*<!-- dark Logo text -->*/}
                            <img src="../../assets/img/LOGO-TEXTO.png" alt="homepage" className="dark-logo" height="20" />
                            {/*<!-- Light Logo text -->*/}
                            <img src="../../assets/img/LOGO-TEXTO.png" className="light-logo" alt="homepage" height="20" />
                        </span>
                    </a>
                    {/*
                    <!-- ============================================================== -->
                    <!-- End Logo -->
                    <!-- ============================================================== -->
                    <!-- ============================================================== -->
                    <!-- Toggle which is visible on mobile only -->
                    <!-- ============================================================== -->
                    */}
                    <a className="topbartoggler d-block d-md-none waves-effect waves-light" href="javascript:void(0)" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="ti-more" />
                    </a>
                </div>
                {/*
                <!-- ============================================================== -->
                <!-- End Logo -->
                <!-- ============================================================== -->
                */}
                <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin6">
                    {/*
                    <!-- ============================================================== -->
                    <!-- toggle and nav items -->
                    <!-- ============================================================== -->
                    */}
                    <ul className="navbar-nav float-left mr-auto">
                        <li className="nav-item d-none d-md-block">
                            <a className="nav-link sidebartoggler waves-effect waves-light" href="javascript:void(0)" data-sidebartype="mini-sidebar" onClick={this.toggleMenu.bind(this)}>
                                <i className="sl-icon-menu font-20 text-dark" />
                            </a>
                        </li>
                        {/*
                        <!-- ============================================================== -->
                        <!-- Comment -->
                        <!-- ============================================================== -->
                        */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="ti-bell font-20 text-dark"></i>
                            </a>
                            <div className="dropdown-menu mailbox animated bounceInDown">
                                <span className="with-arrow">
                                    <span className="bg-primary"></span>
                                </span>
                                <ul className="list-style-none">
                                    <li>
                                        <div className="drop-title bg-primary text-white">
                                            <h4 className="m-b-0 m-t-5">4 New</h4>
                                            <span className="font-light">Notifications</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="message-center notifications">
                                            {/*<!-- Message -->*/}
                                            <a href="javascript:void(0)" className="message-item">
                                                <span className="btn btn-danger btn-circle">
                                                    <i className="fa fa-link"></i>
                                                </span>
                                                <div className="mail-contnet">
                                                    <h5 className="message-title">Luanch Admin</h5>
                                                    <span className="mail-desc">Just see the my new admin!</span>
                                                    <span className="time">9:30 AM</span>
                                                </div>
                                            </a>
                                            {/*<!-- Message -->*/}
                                            <a href="javascript:void(0)" className="message-item">
                                                <span className="btn btn-success btn-circle">
                                                    <i className="ti-calendar"></i>
                                                </span>
                                                <div className="mail-contnet">
                                                    <h5 className="message-title">Event today</h5>
                                                    <span className="mail-desc">Just a reminder that you have event</span>
                                                    <span className="time">9:10 AM</span>
                                                </div>
                                            </a>
                                            {/*<!-- Message -->*/}
                                            <a href="javascript:void(0)" className="message-item">
                                                <span className="btn btn-info btn-circle">
                                                    <i className="ti-settings"></i>
                                                </span>
                                                <div className="mail-contnet">
                                                    <h5 className="message-title">Settings</h5>
                                                    <span className="mail-desc">You can customize this template as you want</span>
                                                    <span className="time">9:08 AM</span>
                                                </div>
                                            </a>
                                            {/*<!-- Message -->*/}
                                            <a href="javascript:void(0)" className="message-item">
                                                <span className="btn btn-primary btn-circle">
                                                    <i className="ti-user"></i>
                                                </span>
                                                <div className="mail-contnet">
                                                    <h5 className="message-title">Pavan kumar</h5>
                                                    <span className="mail-desc">Just see the my admin!</span>
                                                    <span className="time">9:02 AM</span>
                                                </div>
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="nav-link text-center m-b-5" href="javascript:void(0);">
                                            <strong>Check all notifications</strong>
                                            <i className="fa fa-angle-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        {/*
                        <!-- ============================================================== -->
                        <!-- End Comment -->
                        <!-- ============================================================== -->
                        */}
                    </ul>
                    {/*
                    <!-- ============================================================== -->
                    <!-- Right side toggle and nav items -->
                    <!-- ============================================================== -->
                    */}
                    <ul className="navbar-nav float-right">
                        {/*
                        <!-- ============================================================== -->
                        <!-- User profile and search -->
                        <!-- ============================================================== -->
                        */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic" href="" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <img src="../../assets/img/LOGO-ICON.png" alt="user" className="rounded-circle" width="31" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                                <span className="with-arrow">
                                    <span className="bg-primary"></span>
                                </span>
                                <div className="d-flex no-block align-items-center p-15 bg-primary text-white m-b-10">
                                    <div className="">
                                        <img src="../../assets/img/LOGO-ICON.png" alt="user" className="img-circle" width="60" />
                                    </div>
                                    <div className="m-l-10">
                                        <h4 className="m-b-0">Steave Jobs</h4>
                                        <p className=" m-b-0">varun@gmail.com</p>
                                    </div>
                                </div>
                                {/*
                                <a className="dropdown-item" href="javascript:void(0)">
                                    <i className="ti-user m-r-5 m-l-5"></i> My Profile
                                </a>
                                <a className="dropdown-item" href="javascript:void(0)">
                                    <i className="ti-wallet m-r-5 m-l-5"></i> My Balance
                                </a>
                                <a className="dropdown-item" href="javascript:void(0)">
                                    <i className="ti-email m-r-5 m-l-5"></i> Inbox
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="javascript:void(0)">
                                    <i className="ti-settings m-r-5 m-l-5"></i> Account Setting
                                </a>
                                <div className="dropdown-divider"></div>
                                */}
                                <a className="dropdown-item" onClick={(e) => this.props.onLogout(e)}>
                                    <i className="fa fa-power-off m-r-5 m-l-5"></i> Salir
                                </a>
                                {/*
                                <div className="dropdown-divider"></div>
                                <div className="p-l-30 p-10">
                                    <a href="javascript:void(0)" className="btn btn-sm btn-success btn-rounded">View Profile</a>
                                </div>
                                */}
                            </div>
                        </li>
                        {/*
                        <!-- ============================================================== -->
                        <!-- User profile and search -->
                        <!-- ============================================================== -->
                        */}
                    </ul>
                </div>
            </nav>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
