import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { FiAlertCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";

import api from "../api/api";
import { Card } from "../components/Card";
import { TableColaborador } from "../components/TableColaborador";
import { ColaboradorService } from "../services/colaboradorService";
import { alertSuccess, alertError } from '../components/toastr';
import { useNavigate } from "react-router-dom";

export function Colaborador() {
  const service = new ColaboradorService();

  const navigate = useNavigate();

  const [colaboradores, setColaboradores] = useState([]);
  const [colaborador, setColaborador] = useState({});

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    getColaboradores();
  } ,[]);

  const getColaboradores = async () => {
    const response = await api.get("/colaboradores");
    setColaboradores(response.data);
  }

  const deleteColaborador = async () => {
    await service.delete(colaborador.id).then(response =>{
      alertSuccess("Colaborador excluído.")
      closeDeleteDialog();
      getColaboradores();
    }).catch (error => alertError("Erro ao excluir o colaborador."));
  }

  const deleteDialogFooter = () => {
    return (
      <div>
        <button type="button" className="btn btn-primary" onClick={deleteColaborador}>
          <FiCheckCircle style={{marginRight: '2px', marginBottom: '2px'}} /> Sim
        </button>
        <button type="button" className="btn btn-danger" onClick={closeDeleteDialog}>
          <FiXCircle size={19} style={{marginBottom: '2px'}} /> Não
        </button>
      </div>
    );
  }

  const editColaborador = (id) => {
    navigate(`/colaboradores/cadastro/${id}`);
  }

  const openDeleteDialog = (colaborador)  => {
    setColaborador(colaborador);
    setShowDeleteDialog(true);
  }
  
  const closeDeleteDialog = () => setShowDeleteDialog(false);

  return (
    <div className="jumbotron" style={{padding: '10px', marginTop: '-30px'}}>
      <Card title="Colaboradores">

        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <TableColaborador data={colaboradores}
                onClickDelete={openDeleteDialog}
                onClickEdit={editColaborador}
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
                    {`Deseja excluir o colaborador ${colaborador ? `${colaborador.nome}`: ""}?`}
          </Dialog>
        </div>
      </Card>
    </div>
  )
}