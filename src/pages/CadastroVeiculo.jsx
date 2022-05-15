import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Card } from "../components/Card";
import { FormGroup } from "../components/FormGroup";
import { alertError, alertSuccess } from "../components/toastr";
import { Modal } from "../components/Modal";
import { VeiculoService } from "../services/VeiculoService";

export function CadastroVeiculo() {
  const service = new VeiculoService();
  const navigate = useNavigate();
  let params = useParams();

  const [updating, setUpdating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [id, setId] = useState();
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [kmLitro, setKmLitro] = useState('');
  const [disponivel, setDisponivel] = useState(true);

  const { id: idVeiculo } = params;

  useEffect(() => {
    if (idVeiculo) {
      getVeiculoById(idVeiculo);
    }
  } ,[]);

  const getVeiculoById = async (id) => {
    await service.getById(id).then(response => {
      setUpdating(true);
      setId(response.data.id);
      setModelo(response.data.modelo);
      setPlaca(response.data.placa);
      setKmLitro(response.data.kmLitro);
      setDisponivel(response.data.disponivel);
    }).catch(error => {
      return alertError("Veículo não encontrado.");
    });
  }

  const handleSave = async () => {
    const veiculo = { 
      modelo,
      placa, 
      kmLitro: Number(kmLitro.toString().replace(',', '.')), 
      disponivel 
    };
    
    try {
      service.validate(veiculo);
    } catch (error) {
      error.msgs.forEach(e => alertError(e));
      return false;
    }

    await service.save(veiculo).then(response => {
      alertSuccess("Veículo cadastrado.");
      navigate("/veiculos");
    }).catch(error => alertError("Erro ao cadastrar veículo."))
  }

  const handleUpdate = async () => {
    const veiculo = { 
      id,
      modelo,
      placa, 
      kmLitro: Number(kmLitro.toString().replace(',', '.')), 
      disponivel 
    };

    try {
      service.validate(veiculo);
    } catch (error) {
      error.msgs.forEach(e => alertError(e));
      return false;
    }

    await service.update(veiculo).then(response => {
      alertSuccess("Cadastro atualizado");
      navigate("/veiculos");
    }).catch(error => alertError("Erro ao atualizar cadastro do veículo."));
  }

  const onConfirmDelete = async () => {
    await service.delete(id).then(response => {
      alertSuccess("Veículo excluído.");
      navigate("/veiculos");
      handleCloseDialog();
    }).catch(error => alertError("Erro ao excluir veículo."));
  }

  const handleDelete = () => setShowDialog(true);

  const handleCloseDialog = () => setShowDialog(false);

  const verifyCheckBox = (checked) => {
    setDisponivel(checked)
  };

  return (
    <Card title={updating ? "Atualizar Cadastro Veículo" : "Cadastrar Veículo"}>
      <div className="row">
        <div className="col-md-5">
          <FormGroup htmlFor="inputModelo" label="Modelo: ">
            <input type="text"id="inputModelo" 
              className="form-control"
              value={modelo}
              onChange={e => setModelo(e.target.value)} />
          </FormGroup>
        </div>
        <div className="col-md-3">
          <FormGroup htmlFor="inputPlaca" label="Placa: ">
            <input type="text"id="inputPlaca" 
              className="form-control"
              value={placa}
              onChange={e => setPlaca(e.target.value)} />
          </FormGroup>
        </div>
        <div className="col-md-2">
          <FormGroup htmlFor="inputConsumo" label="Consumo: ">
            <input type="text"id="inputConsumo" 
              className="form-control"
              value={kmLitro}
              onChange={e => setKmLitro(e.target.value)} />
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
                onChange={e => verifyCheckBox(e.target.checked)} checked={disponivel} />
              <label className="form-check-label" >Disponível</label>
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

            <Link className="btn btn-danger" to="/veiculos">Cancelar</Link>   
          </div>  
        </div>
      </div>
      {/* Dialog Confirmação */}
      <div>
        <Modal msg={`Deseja excluir este veículo?`}
            closeDialog={handleCloseDialog} 
            showDialog={showDialog}
            onConfirm={onConfirmDelete}
        />
      </div>
    </Card>
  )
}