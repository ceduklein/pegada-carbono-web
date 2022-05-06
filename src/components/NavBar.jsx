import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import { FiUserPlus } from "react-icons/fi"
import { CgUserList } from "react-icons/cg"
import { FaCar } from "react-icons/fa"
import { VscListFlat } from "react-icons/vsc"
import { BiTrip } from "react-icons/bi"

export function NavBar() {
  return(
    <div className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <div className="container">
        <Navbar.Brand href="/">Pegada de Carbono</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbar-bg-light-example">
            <Nav className="me-auto">
              <NavDropdown
                id="basic-nav-dropdown"
                title="Colaboradores"
                menuVariant="light"
              >
                <NavDropdown.Item href="/colaboradores/cadastro">
                  <FiUserPlus style={{marginBottom: '5px'}} /> Novo
                </NavDropdown.Item>
                <NavDropdown.Item href="/colaboradores">
                  <CgUserList size={18} style={{marginBottom: '5px'}} /> Listar
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                id="basic-nav-dropdown"
                title="Veículos"
                menuVariant="light"
              >
                <NavDropdown.Item href="/veiculos/cadastro">
                  <FaCar style={{marginBottom: '5px'}} /> Novo
                </NavDropdown.Item>
                <NavDropdown.Item href="/veiculos">
                  <VscListFlat style={{marginBottom: '2px'}} /> Listar
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                id="basic-nav-dropdown"
                title="Chamados"
                menuVariant="light"
              >
                <NavDropdown.Item href="/chamados/registro">
                  <BiTrip style={{marginBottom: '5px'}} /> Novo
                </NavDropdown.Item>
                <NavDropdown.Item href="/chamados">
                  <VscListFlat style={{marginBottom: '2px'}} /> Listar
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
      </div>
    </div>
  )
}