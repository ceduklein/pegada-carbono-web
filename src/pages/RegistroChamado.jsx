import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { FiAlertCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";

import { Card } from "../components/Card";
import { FormGroup } from "../components/FormGroup";
import { alertError, alertSuccess } from "../components/toastr";
import { ChamadoService } from "../services/ChamadoService";
import { SelectVeiculo } from "../components/SelectVeiculo";
import { SelectColaborador } from "../components/SelectColaborador";
import { formatBr, formatUS } from "../utils/formatDate";
import { formatNumber } from "../utils/formatNumber";
import { Modal } from "../components/Modal";

export function RegistroChamado() {
  const service = new ChamadoService();

  const navigate = useNavigate();
  let params = useParams();

  const [updating, setUpdating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [deleting, setDeleting] = useState(undefined);

  const hoje = formatBr(new Date().toISOString().slice(0, 10));

  const [id, setId] = useState('');
  const [data, setData] = useState(hoje);
  const [endereco, setEndereco] = useState('');
  const [distancia, setDistancia] = useState('');
  const [carbono, setCarbono] = useState('');
  const [concluido, setConcluido] = useState('');
  const [idVeiculo, setIdVeiculo] = useState(undefined);
  const [idColab, setIdColab] = useState('');

  const { id: idChamado } = params

  useEffect(() => {
    if (idChamado) {
      getChamadoById(idChamado);
    }
  } ,[idChamado]);

  const getChamadoById = async (id) => {
    await service.getById(id).then(response => {
      setUpdating(true);
      setId(response.data.id);
      setData(formatBr(response.data.dataInicio));
      setEndereco(response.data.endereco);
      setDistancia(response.data.distancia);
      setCarbono(response.data.pegadaCarbono);
      setConcluido(formatBoolean(response.data.concluido));
      setIdVeiculo(response.data.veiculo.id);
      setIdColab(response.data.colaborador.id);
    }).catch(error => {
      alertError(`Chamado não encontrado para o id informado.`);
      navigate("/chamados");
    })
  }

  const formatBoolean = (concluido) => concluido ? "Concluído" : "Em andamento";

  const save = async () => {
    const chamado = {
      dataInicio: formatUS(data),
      endereco,
      distancia: formatNumber(distancia),
      veiculo: idVeiculo,
      colaborador: idColab
    }

    try {
      service.validate(chamado);
    } catch (error) {
      error.msgs.forEach(e => alertError(e));
      return false;
    }

    await service.save(chamado).then(response => {
      alertSuccess("Chamado inciado.");
      navigate("/chamados");
    }).catch(error => alertError("Erro ao registrar o chamado."));
  };

  const update = async () => {
    const chamado = { id, endereco, distancia: formatNumber(distancia) };
    try {
      service.validateUpdate(chamado);
    } catch (error) {
      error.msgs.forEach(e => alertError(e));
      return false;
    }

    await service.update(chamado).then(response =>{
      alertSuccess("Registro atualizado.");
      navigate("/chamados");
    }).catch(error => alertError("Erro ao atualizar registro."));
  };

  const onConfirmFinish = async () => {
    await service.finish(id).then(response => {
      alertSuccess("Chamado encerrado.");
      navigate("/chamados");
    }).catch(error => alertError("Erro ao encerrar o chamado."));
  }

  const onConfirmDelete = async () => {
    await service.delete(id).then(response => {
      alertSuccess("Chamado excluído.");
      navigate("/chamados");
    }).catch(error => alertError("Erro ao excluir o chamado."))
  }

  const openDialog = (del) => {
    setShowDialog(true);
    del ? setDeleting(true) : setDeleting(false);
  }
 
  const handleCloseDialog = () => setShowDialog(false);

  const msgDialog = deleting ? `Deseja excluir este chamado?` : `Deseja encerrar este chamado?`;

  return (
    <Card title={updating ? "Atualizar Chamado" : "Registrar Chamado"}>
      <div className="row">
        <div className="col-md-2">
          <FormGroup htmlFor="inputId" label="Id: ">
            <input type="text"id="inputId" 
              className="form-control" disabled
              value={id} />
          </FormGroup>
        </div>
        <div className="col-md-2">
          <FormGroup htmlFor="inputData" label="Data: ">
            <input type="text"id="inputData" 
              className="form-control" disabled
              value={data} />
          </FormGroup>
        </div>
        <div className="col-md-4">
          <FormGroup htmlFor="inputCarbono" label="Emissão CO²: ">
            <input type="text" id="inputCarbono" 
              className="form-control" disabled
              value={carbono}
              />
          </FormGroup>
        </div>
        <div className="col-md-4">
          <FormGroup htmlFor="inputSituacao" label="Situação: ">
            <input type="text" id="inputSituacao" 
              className="form-control" disabled
              value={concluido}
              />
          </FormGroup>
        </div>
      </div>

      <div className="row">
        <div className="col-md-10">
          <FormGroup htmlFor="inputEndereco" label="Endereço: ">
            <input type="text"id="inputEndereco" 
              className="form-control"
              value={endereco}
              onChange={e => setEndereco(e.target.value)} />
          </FormGroup>
        </div>
        <div className="col-md-2">
          <FormGroup htmlFor="inputDistancia" label="Distância: ">
            <input type="text"id="inputDistancia" 
              className="form-control"
              value={distancia}
              onChange={e => setDistancia(e.target.value)} />
          </FormGroup>
        </div>
      </div>

      <div className="row">    
        <FormGroup label="Veiculo: ">
          <SelectVeiculo onSelect={e => setIdVeiculo(e)} initialValue={idVeiculo} disable={updating} />
        </FormGroup>

        <FormGroup label="Colaborador: ">
          <SelectColaborador onSelect={e => setIdColab(e)} initialValue={idColab} disable={updating} />
        </FormGroup>
        
      </div>
      
      <div className="row">
        <div className="col-md-12" style={{display: "flex"}}>
          <div style={{marginLeft: "auto"}}>
            <button type="button" 
              className="btn btn-primary"
              onClick={updating ? update : save}> {updating ? "Atualizar" : "Salvar"}
            </button>

            {updating && concluido === "Em andamento" ? 
              (
                <button type="button" 
                  className="btn btn-dark" 
                  onClick={() => openDialog(false)}>Encerrar
                </button>
              ) :
              (
                <></>
              )
            }

            {updating ?
              (
                <button type="button" 
                  className="btn btn-secondary" 
                  onClick={() => openDialog(true)}>Excluir
                </button>
              ) :
              (
                <></>
              )
            }

            <Link className="btn btn-danger" to="/chamados">Cancelar</Link>   
          </div>  
        </div>
      </div>

      {/* Dialog Confirmação */}
      <div>
        <Modal msg={msgDialog}
            closeDialog={handleCloseDialog} 
            showDialog={showDialog}
            onConfirm={deleting ? onConfirmDelete : onConfirmFinish}/>
      </div>
    </Card>
  )
}