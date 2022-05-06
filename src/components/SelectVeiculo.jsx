import { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';

import { VeiculoService } from "../services/VeiculoService";

export function SelectVeiculo(props) {
  const veiculoService = new VeiculoService();
  const [id, setId] = useState('');
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    getData();
  } ,[]);

  const getData = async () => {
    await veiculoService.getVeiculos().then(response => setVeiculos(response.data));
  }

  const labelVeiculos = () => {
    const options = [];
    veiculos.forEach(v => {
      if(v.disponivel)
        options.push({label: `${v.id} - ${v.modelo} - Placa: ${v.placa}`, value: v.id})
    })
    return options;
  }

  const optionsVeiculos = labelVeiculos();

  return(
    <Dropdown className="col-md-5" 
          options={optionsVeiculos}  
          value={id}
          onChange={e => {
            props.onSelect(e.target.value)
            setId(e.target.value)
          }}
          style={{marginLeft: 15, marginTop: 15}}
          placeholder="Selecione um veículo"
    />
  )
}