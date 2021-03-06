import React from 'react'
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Permission } from 'temeforest'
import { checkPermission } from 'temeforest/base/Permission'
import $ from 'jquery'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { connect } from 'react-redux'

const propTypes = {
    children: PropTypes.node,
};
  
const defaultProps = {};

const findRecursivePermissions = (children) => {
    return children.find(p => p.permission && !p.children ? checkPermission(p.permission) : findRecursivePermissions(p.children))
}

class MenuItem extends React.Component {

    onClick = (e) => {
        let _this = $(e.target)
        if(!_this.is('a')){
            _this = _this.parents("a:first")
        }
        if (!_this.hasClass("active")) {
            // hide any open menus and remove all other classes
            $("ul", _this.parents("ul:first")).removeClass("in");
            $("a", _this.parents("ul:first")).removeClass("active");
            
            // open our new menu and add the open class
            _this.next("ul").addClass("in");
            _this.addClass("active");
            
        }
        else if (_this.hasClass("active")) {
            _this.removeClass("active");
            _this.parents("ul:first").removeClass("active");
            _this.next("ul").removeClass("in");
        }
    }

    prevent(e){
        e.preventDefault()
    }

    render(){
        const { name, icon, children, badge, url, level, permission, ...otherProps } = this.props

        if(children && !permission){
            if(!findRecursivePermissions(children)){
                return null
            }
        }

        let margin = (level-1) * 35
        //if(icon) margin -= 35

        let level_name = ''
        if(level === 1) level_name = 'first'
        else if(level === 2) level_name = 'second'
        else if(level === 3) level_name = 'third'

        return (
            <Permission key_permission={permission}>
                <NavItem className={`sidebar-item`} permission={permission}>
                    <NavLink className={`sidebar-link waves-effect waves-dark ${children?'has-arrow':''}`} aria-expanded="false" href={url} style={{marginLeft: margin, whiteSpace:'normal'}} onClick={this.onClick} {...otherProps}>
                        { icon && <i className={icon} onClick={this.prevent}></i> }
                        { children ? <span className="hide-menu" onClick={this.prevent}> {name} </span> : name }
                        { badge && <span class={`badge badge-pill badge-${badge.variant} float-right`} onClick={this.prevent}>{badge.text}</span> }
                    </NavLink>
                    { children &&
                        <ul aria-expanded="false" className={`collapse ${level_name}-level`}>
                            { children.map((submenu, j) => 
                                <MenuItem {...submenu} level={level+1} key={`${level+1}-${j}`} />
                            )}
                        </ul>
                    }
                </NavItem>
            </Permission>
        )
    }
}

class Aside extends React.Component {

    render(){
        const { navConfig, user_info } = this.props
        let level = 1
        return (
            <aside className="left-sidebar no-print" data-sidebarbg="skin6">
                {/*<!-- Sidebar scroll-->*/}
                <div className="scroll-sidebar ps-container ps-theme-default ps-active-y" data-ps-id="ef5a9e5f-affc-b01b-55d7-9c375762dbbb">
                    {/*<!-- Sidebar navigation-->*/}
                    <PerfectScrollbar>
                        <Nav>
                            <nav className="sidebar-nav">
                                <ul id="sidebarnav">
                                    <li style={{backgroundColor: '#eee'}} className="hide-menu">
                                        <div className="col-sm-12" style={{padding:15}}>
                                            <div className="row">
                                                <div className="col-sm-3 col-3">
                                                    <img src="../../assets/img/avatars/default.svg" width="100%" alt="default" style={{maxHeight : 60}} />
                                                </div>
                                                <div className="col-sm-9 col-9">
                                                    <b style={{fontSize: 15}}>{user_info.name ? user_info.name : user_info.username}</b>
                                                    <br/>
                                                    <span style={{fontSize: 12}}>Terminal terrestre</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    { navConfig.items.map((menu, i) =>
                                        <MenuItem {...menu} level={level} key={level+'-'+i} />
                                    )}
                                </ul>
                            </nav>
                        </Nav>
                    {/*<!-- End Sidebar navigation -->*/}
                    </PerfectScrollbar>
                </div>
                {/*<!-- End Sidebar scroll-->*/}
            </aside>
        )
    }
}

Aside.propTypes = propTypes;
Aside.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        user_info : state.user_info
    }
}

export default connect(mapStateToProps)(Aside)