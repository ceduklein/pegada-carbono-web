import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Card } from "../components/Card";
import { CheckBox } from "../components/CheckBox";
import { FormGroup } from "../components/FormGroup";
import { alertError, alertSuccess } from "../components/toastr";

import { ColaboradorService } from "../services/ColaboradorService";

export function CadastroColaborador() {
  const navigate = useNavigate();
  
  const [id, setId] = useState();
  const [nome, setNome] = useState('');
  const [habilitado, setHabilitado] = useState();

  const service = new ColaboradorService();

  const save = async () => {
    const colaborador = {
      nome,
      habilitado
    }
    
    try {
      service.validate(colaborador);
    } catch (error) {
      const errors = error.msgs;
      errors.forEach(e => alertError(e));
      return false;
    }

    await service.save(colaborador).then(response =>{
      alertSuccess("Colaborador cadastrado.")
      navigate("/colaboradores");
    }).catch(error => alertError(error.response.data.message));
  }

  const verifyCheckBox = (checked) => {
    setHabilitado(checked)
  };

  return (
    <Card title="Cadastrar Colaborador">
      <div className="row">
        <div className="col-md-10">
          <FormGroup htmlFor="inputNome" label="Nome: ">
            <input type="text"id="inputNome" 
              className="form-control"
              value={nome}
              onChange={e => setNome(e.target.value)} />
          </FormGroup>
        </div>
        <div className="col-md-2">
          <FormGroup htmlFor="inputId" label="Id: ">
            <input type="text" id="inputId" 
              className="form-control" disabled
              value={id}
              />
          </FormGroup>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <FormGroup label="">
            <CheckBox label="Habilitado"
              click={verifyCheckBox}>
          </CheckBox>
          </FormGroup>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12" style={{display: "flex"}}>
          <div style={{marginLeft: "auto"}}>
            <button type="button" 
              className="btn btn-primary"
              onClick={save}>Salvar
            </button>

            <Link className="btn btn-danger" to="/colaboradores">Cancelar</Link>
              
          </div>  
        </div>
      </div>
    </Card>
  )
}