import React from 'react'
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';

const propTypes = {
    children: PropTypes.node,
};
  
const defaultProps = {};

class Aside extends React.Component {
    render(){
        const { navConfig } = this.props
        return (
            <aside className="left-sidebar" data-sidebarbg="skin6">
                {/*<!-- Sidebar scroll-->*/}
                <div className="scroll-sidebar">
                    {/*<!-- Sidebar navigation-->*/}
                    <Nav tabs>
                        <nav className="sidebar-nav">
                            <ul id="sidebarnav" className="in">
                                { navConfig.items.map((menu, i) =>
                                    <NavItem className="sidebar-item" key={'menu'+i}>
                                        <NavLink className={`sidebar-link waves-effect waves-dark ${menu.children?'has-arrow':''}`} aria-expanded="false" href={menu.url}>
                                            { menu.icon && <i className={menu.icon}></i> }
                                            { menu.children ? <span className="hide-menu"> {menu.name} </span> : menu.name }
                                            { menu.badge && <span class={`badge badge-pill badge-${menu.badge.variant} float-right`}>{menu.badge.text}</span> }
                                        </NavLink>
                                        { menu.children &&
                                            <ul aria-expanded="false" className="collapse first-level in">
                                                { menu.children.map((submenu, j) => 
                                                    <NavItem className="sidebar-item" key={'submenu-'+i+'-'+j}>
                                                        <NavLink className="sidebar-link" href={submenu.url}>
                                                            { submenu.icon && <i className={submenu.icon}></i> }
                                                            { submenu.name }
                                                        </NavLink>
                                                    </NavItem>
                                                )}
                                            </ul>
                                        }
                                    </NavItem>
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