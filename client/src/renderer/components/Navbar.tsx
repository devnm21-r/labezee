import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from 'reactstrap';
import { auth } from '../services/firebase';
import { useHistory } from 'react-router-dom';

const NammaNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Lab EZ</NavbarBrand>
      <Button onClick={() => {
        // eslint-disable-next-line promise/always-return
        auth().signOut().then(() => {
          history.push('/auth');
        });
      }} >
        Logout
      </Button>
      <NavbarToggler onClick={toggle} />
      {/*<Collapse isOpen={isOpen} navbar>*/}
      {/*  <Nav className="mr-auto" navbar>*/}
      {/*    <NavItem>*/}
      {/*      <NavLink href="/components/">Components</NavLink>*/}
      {/*    </NavItem>*/}
      {/*    <NavItem>*/}
      {/*      <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>*/}
      {/*    </NavItem>*/}
      {/*    <UncontrolledDropdown nav inNavbar>*/}
      {/*      <DropdownToggle nav caret>*/}
      {/*        Options*/}
      {/*      </DropdownToggle>*/}
      {/*      <DropdownMenu right>*/}
      {/*        <DropdownItem>*/}
      {/*          Option 1*/}
      {/*        </DropdownItem>*/}
      {/*        <DropdownItem>*/}
      {/*          Option 2*/}
      {/*        </DropdownItem>*/}
      {/*        <DropdownItem divider />*/}
      {/*        <DropdownItem>*/}
      {/*          Reset*/}
      {/*        </DropdownItem>*/}
      {/*      </DropdownMenu>*/}
      {/*    </UncontrolledDropdown>*/}
      {/*  </Nav>*/}
      {/*  <NavbarText>Simple Text</NavbarText>*/}
      {/*</Collapse>*/}
    </Navbar>
  );
}

export default NammaNavbar;
