import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LogOutButton } from './LoginOut'
import { useSelector } from 'react-redux'

const Menu = () => {
  const user = useSelector((state) => state.user)

  return (
    <Navbar
      className="nav-green"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link className="text-primary h4" to="/">
              blogs 📝
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link className="text-primary h4" to="/users">
              users 👥
            </Link>
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link className="ml-auto" href="#" as="span">
            {user ? (
              <LogOutButton username={user.name} />
            ) : (
              <Link to="/login">login</Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export { Menu }
