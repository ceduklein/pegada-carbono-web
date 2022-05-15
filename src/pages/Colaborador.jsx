import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "../components/Card";
import { TableColaborador } from "../components/TableColaborador";
import { ColaboradorService } from "../services/colaboradorService";
import { alertSuccess, alertError } from '../components/toastr';
import { Modal } from "../components/Modal";


export function Colaborador() {
  const service = new ColaboradorService();

  const navigate = useNavigate();

  const [colaboradores, setColaboradores] = useState([]);
  const [colaborador, setColaborador] = useState({});

  const [showDialog, setShowDialog] = useState(false);
  const [msg, setMsg] = useState(undefined);

  useEffect(() => {
    getColaboradoresData();
  } ,[]);

  const getColaboradoresData = async () => {
    await service.getColaboradores().then(response => setColaboradores(response.data))
      .catch(error => alertError("Erro ao carregar lista de colaboradores."));
  }

  const onConfirmDelete = async () => {
    await service.delete(colaborador.id).then(response =>{
      alertSuccess("Colaborador excluído.")
      handleCloseDialog();
      getColaboradoresData();
    }).catch (error => alertError("Erro ao excluir o colaborador."));
  }

  const handleEdit = (id) => navigate(`/colaboradores/cadastro/${id}`);

  const handleDelete = (colaborador)  => {
    setColaborador(colaborador);
    setMsg(`Deseja excluir o cadastro do colaborador ${colaborador.nome}?`)
    setShowDialog(true);
  };
  
  const handleCloseDialog = () => setShowDialog(false);

  return (
    <div className="jumbotron" style={{padding: '10px', marginTop: '-30px'}}>
      <Card title="Colaboradores">

        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <TableColaborador data={colaboradores}
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