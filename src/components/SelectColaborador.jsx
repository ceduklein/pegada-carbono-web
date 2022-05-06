import { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';

import { ColaboradorService } from "../services/ColaboradorService";

export function SelectColaborador(props) {
  const colabService = new ColaboradorService();
  const [id, setId] = useState('');
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    getData();
  } ,[]);

  const getData = async () => {
    await colabService.getColaboradores().then(response => setColaboradores(response.data));
  }

  const labelColaboradores = () => {
    const options = [];
    colaboradores.forEach(c => {
      if(c.habilitado)
        options.push({label: `${c.id} - ${c.nome}`, value: c.id})
    })
    return options;
  }

  const optionsColaboradores = labelColaboradores();

  return(
    <Dropdown className="col-md-5" 
          options={optionsColaboradores}  
          value={id}
          onChange={e => {
            props.onSelect(e.target.value)
            setId(e.target.value)
          }}
          style={{marginLeft: 15, marginTop: 15}}
          placeholder="Selecione um colaborador"
    />
  )
}