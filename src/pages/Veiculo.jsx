import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Dialog } from "primereact/dialog";
import { FiAlertCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";

import { alertError, alertSuccess } from "../components/toastr";
import { VeiculoService } from "../services/VeiculoService";
import { Card } from "../components/Card";
import { TableVeiculo } from "../components/TableVeiculo";

export function Veiculo() {
  const navigate = useNavigate();

  const service = new VeiculoService();

  const [veiculos, setVeiculos] = useState([]);
  const [veiculo, setVeiculo] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    getVeiculosData();
    console.log(veiculos);
  } ,[]);

  const getVeiculosData = async () => {
    await service.getVeiculos().then(response => setVeiculos(response.data))
      .catch(error => alertError("Erro ao carregar lista de veículos."));
  }

  const deleteVeiculo = async () => {
    await service.delete(veiculo.id).then(response => {
      alertSuccess("Veículo excluído.")
      closeDeleteDialog();
      getVeiculosData();
    })
  }

  const editVeiculo = (id) => navigate(`/veiculos/cadastro/${id}`);

  const openDeleteDialog = (veiculo)  => {
    setVeiculo(veiculo)
    setShowDeleteDialog(true);
  }
 
  const closeDeleteDialog = () => setShowDeleteDialog(false);

  const deleteDialogFooter = () => {
    return (
      <div>
        <button type="button" className="btn btn-primary" onClick={deleteVeiculo}>
          <FiCheckCircle style={{marginRight: '2px', marginBottom: '2px'}} /> Sim
        </button>
        <button type="button" className="btn btn-danger" onClick={closeDeleteDialog}>
          <FiXCircle size={19} style={{marginBottom: '2px'}} /> Não
        </button>
      </div>
    );
  }

  return (
    <div className="jumbotron" style={{padding: '10px', marginTop: '-30px'}}>
      <Card title="Veículos">

        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <TableVeiculo data={veiculos}
                onClickDelete={openDeleteDialog}
                onClickEdit={editVeiculo}
              />
            </div>
          </div>
        </div>

        {/* Dialog Confirmação de Exclusão */}
        <div>
          <Dialog header={<span>
                            <FiAlertCircle size={30} color={'red'} style={{marginRight: 20}} />
                            Confirmação!
                          </span>}
                  visible={showDeleteDialog} 
                  style={{ width: '40vw' }}
                  footer={deleteDialogFooter}
                  modal={true} 
                  onHide={closeDeleteDialog}>
                    {`Deseja excluir o veículo ${veiculo ? `${veiculo.modelo} - Placa: ${veiculo.placa}`: ""}?`}
          </Dialog>
        </div>
      </Card>
    </div>
  )
}