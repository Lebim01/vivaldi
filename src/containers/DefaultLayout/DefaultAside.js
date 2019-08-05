import React from 'react'
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';

const propTypes = {
    children: PropTypes.node,
};
  
const defaultProps = {};

class MenuItem extends React.Component {
    render(){
        const { name, icon, children, badge, url, level } = this.props

        let level_name = ''
        if(level == 1) level_name = 'first'
        else if(level == 2) level_name = 'second'

        return (
            <NavItem className={`sidebar-item`}>
                <NavLink className={`sidebar-link waves-effect waves-dark ${children?'has-arrow':''}`} aria-expanded="false" href={url}>
                    { icon && <i className={icon}></i> }
                    { children ? <span className="hide-menu"> {name} </span> : name }
                    { badge && <span class={`badge badge-pill badge-${badge.variant} float-right`}>{badge.text}</span> }
                </NavLink>
                { children &&
                    <ul aria-expanded="false" className={`collapse ${level_name}-level in`}>
                        { children.map((submenu, j) => 
                            <MenuItem {...submenu} level={level+1} key={`${level+1}-${j}`} />
                        )}
                    </ul>
                }
            </NavItem>
        )
    }
}

class Aside extends React.Component {

    render(){
        const { navConfig } = this.props
        let level = 1
        return (
            <aside className="left-sidebar" data-sidebarbg="skin6">
                {/*<!-- Sidebar scroll-->*/}
                <div className="scroll-sidebar ps-container ps-theme-default ps-active-y">
                    {/*<!-- Sidebar navigation-->*/}
                    <Nav>
                        <nav className="sidebar-nav">
                            <ul id="sidebarnav" className="in">
                                { navConfig.items.map((menu, i) =>
                                    <MenuItem {...menu} level={level} key={level+'-'+i} />
                                )}
                            </ul>
                        </nav>
                    </Nav>
                    {/*<!-- End Sidebar navigation -->*/}
                </div>
                {/*<!-- End Sidebar scroll-->*/}
            </aside>
        )
    }
}

Aside.propTypes = propTypes;
Aside.defaultProps = defaultProps;

export default Aside