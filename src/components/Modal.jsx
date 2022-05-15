import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { FiAlertCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";
 

export function Modal(props) {
  const { msg, showDialog, closeDialog, onConfirm } = props;

  const dialogHeader = () => {
    return (
      <span>
        <FiAlertCircle size={30} color={'red'} style={{marginRight: 20}} />
        Confirmação
      </span>
    );
  };

  const dialogFooter = () => {
    return (
      <div>
        <button type="button" className="btn btn-primary" onClick={e => onConfirm()}>
          <FiCheckCircle style={{marginRight: '2px', marginBottom: '2px'}} /> Sim
        </button>
        <button type="button" className="btn btn-danger" onClick={closeDialog}>
          <FiXCircle size={19} style={{marginBottom: '2px'}} /> Não
        </button>
      </div>
    )
  }

  return (
    <Dialog visible={showDialog}
          header={dialogHeader}
          footer={dialogFooter}
          modal={true}
          onHide={closeDialog}
          style={{width: '40vw'}}
    >
      {msg}
    </Dialog>
  )
}