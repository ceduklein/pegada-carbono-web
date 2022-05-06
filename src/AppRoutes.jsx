import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { CadastroColaborador } from './pages/CadastroColaborador';
import { CadastroVeiculo } from './pages/CadastroVeiculo';
import { Chamado } from './pages/Chamado';
import { Colaborador } from './pages/Colaborador';
import { Home } from './pages/Home';
import { RegistroChamado } from './pages/RegistroChamado';
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
        <Route path="/veiculos/cadastro" element={<CadastroVeiculo />}>
          <Route path=":id" element={<CadastroVeiculo />} />
        </Route>
        <Route path="/chamados" element={<Chamado />} />
        <Route path="/chamados/registro" element={<RegistroChamado />}>
          <Route path=":id" element={<RegistroChamado />} />
        </Route>
      </Routes>
    </Router>
  )
}