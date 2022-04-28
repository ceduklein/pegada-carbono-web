import "bootswatch/dist/spacelab/bootstrap.min.css";
import "./custom.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import "toastr/build/toastr.css"
                            //icons

import { AppRoutes } from "./AppRoutes"
import { NavBar } from "./components/NavBar";

function App() {

  return (
    <>
      <NavBar />
      <div className="container">
        <AppRoutes />
      </div>
    </>
  )
}

export default App;