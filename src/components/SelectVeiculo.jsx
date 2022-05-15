import { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';

import { VeiculoService } from "../services/VeiculoService";

export function SelectVeiculo(props) {
  const { initialValue, onSelect, disable } = props
  const veiculoService = new VeiculoService();
  const [id, setId] = useState('');
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    getData();
    if (initialValue)
      setId(initialValue);
  } ,[initialValue]);

  const getData = async () => {
    await veiculoService.getVeiculos().then(response => setVeiculos(response.data));
  }

  const labelVeiculos = () => {
    const options = [];
    veiculos.forEach(v => {
      if (disable)
        options.push({label: `${v.id} - ${v.modelo} - Placa: ${v.placa}`, value: v.id});
      else if(v.disponivel)
        options.push({label: `${v.id} - ${v.modelo} - Placa: ${v.placa}`, value: v.id});
    });
    return options;
  }

  const optionsVeiculos = labelVeiculos();

  const handleChange = (e) => {
    onSelect(e.target.value);
    setId(e.target.value);
  }

  return(
    <Dropdown className="col-md-5" 
          options={optionsVeiculos}  
          value={id}
          onChange={e => handleChange(e)}
          style={{marginLeft: 15, marginTop: 15}}
          placeholder="Selecione um veículo"
          disabled={disable}
    />
  )
}