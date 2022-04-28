export function NavBar() {
  return(
    <div className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <div className="container">
        <a href="" className="navbar-brand">Pegada de Carbono</a>
        <button className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarColor03" 
          aria-controls="navbarColor03" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/colaboradores">Colaboradores</a>
            </li>
          </ul>
        </div>

      </div>

    </div>
  )
}