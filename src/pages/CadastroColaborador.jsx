import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Card } from "../components/Card";
import { FormGroup } from "../components/FormGroup";
import { alertError, alertSuccess } from "../components/toastr";
import { Modal } from "../components/Modal";
import { ColaboradorService } from "../services/ColaboradorService";

export function CadastroColaborador() {
  const service = new ColaboradorService();
  const navigate = useNavigate();
  let params = useParams();
  
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [habilitado, setHabilitado] = useState(false);

  const [updating, setUpdating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const { id : idColaborador } = params;

  useEffect(() => {
    if (idColaborador) {
      getColaboradorById(idColaborador);
    }
  } ,[]);

  const getColaboradorById = async (id) => {
    await service.getById(id).then(response => {
      setUpdating(true);
      setId(response.data.id);
      setNome(response.data.nome);
      setHabilitado(response.data.habilitado);
    }).catch(error => alertError("Colaborador não encontrado."));
  }

  const handleSave = async () => {
    const colaborador = { nome, habilitado };
    try {
      service.validate(colaborador);
    } catch (error) {
      const errors = error.msgs;
      errors.forEach(e => alertError(e));
      return false;
    }

    await service.save(colaborador).then(response =>{
      alertSuccess("Colaborador cadastrado.");
      navigate("/colaboradores");
    }).catch(error => alertError("Erro ao cadastrar colaborador."));
  }

  const handleUpdate = async () => {
    const colaborador = { id, nome, habilitado };
    try {
      service.validate(colaborador);
    } catch (error) {
      const errors = error.msgs;
      errors.forEach(e => alertError(e));
      return false;
    }

    await service.update(colaborador).then(response =>{
      alertSuccess("Cadastro atualizado.");
      navigate("/colaboradores");
    }).catch(error => alertError("Erro ao atulizar cadastro do colaborador."));
  }

  const onConfirmDelete = async () => {
    await service.delete(id).then(response => {
      alertSuccess("Colaborador excluído.");
      navigate("/colaboradores");
      handleCloseDialog();
    }).catch(error => alertError("Erro ao excluir colaborador."))
  }

  const verifyCheckBox = (checked) => {
    setHabilitado(checked)
  };

  const handleDelete = () => setShowDialog(true);

  const handleCloseDialog = () => setShowDialog(false);

  return (
    <Card title={updating ? "Atualizar Cadastro Colaborador" : "Cadastrar Colaborador"}>
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
              value={id || ""}
              />
          </FormGroup>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <FormGroup label="">
            <div className="form-check">
              <input className="form-check-input" 
                type="checkbox" 
                onChange={e => verifyCheckBox(e.target.checked)} checked={habilitado} />
              <label className="form-check-label" >Habilitado</label>
            </div>
          </FormGroup>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12" style={{display: "flex"}}>
          <div style={{marginLeft: "auto"}}>
            <button type="button" 
              className="btn btn-primary"
              onClick={updating ? handleUpdate : handleSave}> {updating ? "Atualizar" : "Salvar"}
            </button>
            {updating ?
              (
                <button type="button" 
                  className="btn btn-secondary"
                  onClick={handleDelete}> Excluir
                </button>
              ) :
              (
                <></>
              )
            }
            <Link className="btn btn-danger" to="/colaboradores">Cancelar</Link>   
          </div>  
        </div>
      </div>
      {/* Dialog Confirmação */}
      <div>
        <Modal msg="Deseja excluir este colaborador?"
            closeDialog={handleCloseDialog} 
            showDialog={showDialog}
            onConfirm={onConfirmDelete}
        />
      </div>
    </Card>
  )
}