import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Card } from "../components/Card";
import { FormGroup } from "../components/FormGroup";
import { alertError, alertSuccess } from "../components/toastr";
import { ChamadoService } from "../services/ChamadoService";
import { ColaboradorService } from "../services/ColaboradorService";
import { VeiculoService } from "../services/VeiculoService";
import { SelectVeiculo } from "../components/SelectVeiculo";
import { SelectColaborador } from "../components/SelectColaborador";
import { formatBr, formatUS } from "../utils/formatDate";

export function RegistroChamado() {
  const service = new ChamadoService();
  const colaboradorService = new ColaboradorService();
  const veiculoService = new VeiculoService();

  const navigate = useNavigate();
  let params = useParams();

  const [updating, setUpdating] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);
  const [veiculos, setVeiculos] = useState([]);

  const hoje = formatBr(new Date().toISOString().slice(0, 10));

  const [id, setId] = useState('');
  const [data, setData] = useState(hoje);
  const [endereco, setEndereco] = useState('');
  const [distancia, setDistancia] = useState('');
  const [carbono, setCarbono] = useState('');
  const [concluido, setConcluido] = useState('');
  const [idVeiculo, setIdVeiculo] = useState('');
  const [idColab, setIdColab] = useState('');

  const save = async () => {
    const chamado = {
      dataInicio: formatUS(data),
      endereco,
      distancia: Number(distancia.toString().replace(',', '.')),
      veiculo: idVeiculo,
      colaborador: idColab
    }
    console.log(chamado)
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
          <SelectVeiculo onSelect={e => setIdVeiculo(e)} />
        </FormGroup>

        <FormGroup label="Colaborador: ">
          <SelectColaborador onSelect={e => setIdColab(e)} />
        </FormGroup>
        
      </div>
      
      <div className="row">
        <div className="col-md-12" style={{display: "flex"}}>
          <div style={{marginLeft: "auto"}}>
            <button type="button" 
              className="btn btn-primary"
              onClick={updating ? update : save}> {updating ? "Atualizar" : "Salvar"}
            </button>

            <Link className="btn btn-danger" to="/colaboradores">Cancelar</Link>   
          </div>  
        </div>
      </div>
    </Card>
  )
}