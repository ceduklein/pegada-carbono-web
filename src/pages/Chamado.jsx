import { useState, useEffect, useRe } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "../components/Card";
import { alertError, alertSuccess } from "../components/toastr";
import { ChamadoService } from "../services/ChamadoService";
import { TableChamado } from "../components/TableChamado";
import { Modal } from "../components/Modal";

export function Chamado() {
  const navigate = useNavigate();
  const service = new ChamadoService();

  const [chamados, setChamados] = useState([]);
  const [chamado, setChamado] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [msg, setMsg] = useState(undefined);

  useEffect(() => {
    getData();
  },[])

  const getData = async () => {
    await service.getChamados().then(response => {
      setChamados(response.data);
    }).catch(error => alertError("Erro ao carregar lista de colaboradores"));
  }

  const handleFinish = (c) => {
    setChamado(c);
    setMsg(`Deseja encerrar o chamado da ${c.endereco}`);
    setDeleting(false);
    setShowDialog(true);
  }

  const handleDelete = (c) => {
    setChamado(c);
    setDeleting(true);
    setMsg(`Deseja excluir o chamado da ${c.endereco}`);
    setShowDialog(true);
  }

  const handleEdit = (id) => navigate(`/chamados/registro/${id}`);
  
  const handleCloseDialog = () => setShowDialog(false);

  const onConfirmFinish = async () => {
    await service.finish(chamado.id).then(response => {
      alertSuccess("Chamado encerrado");
      getData();
      handleCloseDialog();
    }).catch(error => alertError("Erro ao encerrar o chamado"));
  }

  const onConfirmDelete = async () => {
    await service.delete(chamado.id).then(response => {
      alertSuccess("Chamado excluído");
      getData();
      handleCloseDialog();
    }).catch(error => {"Erro ao excluir o chamado"});
  }

  return (
    <div className="jumbotron" style={{padding: '10px', marginTop: '-30px'}}>
      <Card title="Chamados">
        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <TableChamado data={chamados}
                onClickDelete={handleDelete}
                onClickEdit={handleEdit}
                onClickFinish={handleFinish}
              />
            </div>
          </div>
        </div>
        
        {/* Diálogo de confirmação! */}
        <div>
          <Modal msg={msg}
            closeDialog={handleCloseDialog} 
            showDialog={showDialog}
            onConfirm={deleting ? onConfirmDelete : onConfirmFinish}
          />
        </div>
      </Card>
    </div>
  )
}