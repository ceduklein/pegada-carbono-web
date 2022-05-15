import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import { alertError, alertSuccess } from "../components/toastr";
import { VeiculoService } from "../services/VeiculoService";
import { Card } from "../components/Card";
import { TableVeiculo } from "../components/TableVeiculo";
import { Modal } from "../components/Modal";

export function Veiculo() {
  const navigate = useNavigate();
  const service = new VeiculoService();

  const [veiculos, setVeiculos] = useState([]);
  const [veiculo, setVeiculo] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [msg, setMsg] = useState(undefined);

  useEffect(() => {
    getVeiculosData();
  } ,[]);

  const getVeiculosData = async () => {
    await service.getVeiculos().then(response => setVeiculos(response.data))
      .catch(error => alertError("Erro ao carregar lista de veículos."));
  }

  const onConfirmDelete = async () => {
    await service.delete(veiculo.id).then(response => {
      alertSuccess("Veículo excluído.")
      getVeiculosData();
      setShowDialog(false);
    }).catch(error => alertError("Erro ao excluir o veículo."))
  }

  const handleEdit = (id) => navigate(`/veiculos/cadastro/${id}`);

  const handleDelete = (veiculo)  => {
    setVeiculo(veiculo)
    setMsg(`Deseja excluir o veículo ${veiculo.modelo} - Placa: ${veiculo.placa}?`)
    setShowDialog(true);
  }
 
  const handleCloseDialog = () => setShowDialog(false);

  return (
    <div className="jumbotron" style={{padding: '10px', marginTop: '-30px'}}>
      <Card title="Veículos">

        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <TableVeiculo data={veiculos}
                onClickDelete={handleDelete}
                onClickEdit={handleEdit}
              />
            </div>
          </div>
        </div>

        {/* Dialog Confirmação de Exclusão */}
        <div>
          <Modal msg={msg}
              closeDialog={handleCloseDialog} 
              showDialog={showDialog}
              onConfirm={onConfirmDelete}
          />
        </div>
      </Card>
    </div>
  )
}