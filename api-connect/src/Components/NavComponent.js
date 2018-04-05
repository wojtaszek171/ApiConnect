import React, { Component } from 'react';
import {Route, NavLink, BrowserRouter} from "react-router-dom";
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import Calc from './Calc.js';
import Wiki from './Wiki.js';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

class NavComponent extends Component {

  render() {
    return (
      <div>
                  <BrowserRouter>
                            <div>
                            <Navbar inverse collapseOnSelect>
                                <Navbar.Header>
                                  <Navbar.Brand>
                                    <LinkContainer to="/">
                                      <a>Home</a>
                                    </LinkContainer>
                                  </Navbar.Brand>
                                  <Navbar.Toggle />
                                </Navbar.Header>
                                <Navbar.Collapse>
                                  <Nav>
                                    <LinkContainer to="/calc">
                                      <NavItem eventKey={1}>
                                        Calcatraz API
                                      </NavItem>
                                    </LinkContainer>
                                      <LinkContainer to="/wiki">
                                          <NavItem eventKey={2}>
                                              Wikipedia API
                                          </NavItem>
                                      </LinkContainer>
                                    <NavItem eventKey={3}>
                                    </NavItem>

                                  </Nav>
                                  <Nav pullRight>
                                    <NavItem eventKey={1} href="#">
                                      Link Right
                                    </NavItem>
                                    <NavItem eventKey={2} href="#">
                                      Link Right
                                    </NavItem>
                                  </Nav>
                                </Navbar.Collapse>
                              </Navbar>
                              <div className="content">
                                <Route exact path="/" component=""/>
                                <Route path="/calc" component={Calc}/>
                                  <Route path="/wiki" component={Wiki}/>
                              </div>
                            </div>
                  </BrowserRouter>
      </div>
    );
  }
}

export default NavComponent;
