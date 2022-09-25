import React, {useEffect, useState} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Button, Container, Nav, Navbar} from 'react-bootstrap'
import {useNavigate} from "react-router-dom";

const Header = () => {
    let navigate = useNavigate();


    const [isLogged, setisLogged] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        localStorage.getItem('jwt') ? setisLogged(true) : false

    }, [])

    const disconnect = () => {
        localStorage.removeItem('jwt')
        setisLogged(false)
        navigate("/")
    }

    return (
    <header>
        <Navbar className="p-3" bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand> <img
              src="/favicon.png"
              width="120"
              height="120"
              className="d-inline-block align-items-center"
          />WEBLIO</Navbar.Brand>

          </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {isLogged ? <Nav className="ms-auto">
                        <LinkContainer to="/mon-profil">
                            <Nav.Link>Voir mon profil</Nav.Link>
                        </LinkContainer>
                        <Button className={"m-5 mt-0 mb-0"} onClick={disconnect}>Se déconnecter</Button>
                    </Nav>
                    :<Nav className="ms-auto">
                  <LinkContainer to="/se-connecter">
                    <Nav.Link>Connexion</Nav.Link>
                  </LinkContainer>
                </Nav>}
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header
