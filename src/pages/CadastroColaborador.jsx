import { useState } from "react";
import { Card } from "../components/Card";
import { CheckBox } from "../components/CheckBox";
import { FormGroup } from "../components/FormGroup";
import { Link } from "react-router-dom";

export function CadastroColaborador() {
  const [id, setId] = useState();
  const [nome, setNome] = useState('');
  const [habilitado, setHabilitado] = useState();

  const save = async () => {
    console.log(id)
    console.log(nome)
    console.log(habilitado)
  }

  function verifyCheckBox(checked) {
    setHabilitado(checked)
  }

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