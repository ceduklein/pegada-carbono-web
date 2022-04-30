import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { CadastroColaborador } from './pages/CadastroColaborador';
import { Colaborador } from './pages/Colaborador';
import { Home } from './pages/Home';
import { Veiculo } from './pages/Veiculo';

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/colaboradores" element={<Colaborador />} />
        <Route path='/colaboradores/cadastro' element={<CadastroColaborador />}>
          <Route path=":id" element={<CadastroColaborador />} />
        </Route>
        <Route path="/veiculos" element={<Veiculo />} />
      </Routes>
    </Router>
  )
}