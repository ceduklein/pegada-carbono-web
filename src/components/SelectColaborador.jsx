import { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';

import { ColaboradorService } from "../services/ColaboradorService";

export function SelectColaborador(props) {
  const { initialValue, onSelect, disable } = props
  const colabService = new ColaboradorService();
  const [id, setId] = useState('');
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    getData();
    if(initialValue)
      setId(initialValue);
  } ,[initialValue]);

  const getData = async () => {
    await colabService.getColaboradores().then(response => setColaboradores(response.data));
  }

  const labelColaboradores = () => {
    const options = [];
    colaboradores.forEach(c => {
      if(disable)
        options.push({label: `${c.id} - ${c.nome}`, value: c.id});
      else if(c.habilitado)
        options.push({label: `${c.id} - ${c.nome}`, value: c.id});
    })
    return options;
  }

  const optionsColaboradores = labelColaboradores();

  const handleChange = (e) => {
    onSelect(e.target.value)
    setId(e.target.value)
  }

  return(
    <Dropdown className="col-md-5" 
          options={optionsColaboradores}  
          value={id}
          onChange={e => handleChange(e)}
          style={{marginLeft: 15, marginTop: 15}}
          placeholder="Selecione um colaborador"
          disabled={disable}
    />
  )
}