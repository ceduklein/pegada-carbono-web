import api from "../api/api";
import { ErroValidcao } from "../exception/erroValidacao";

const url = '/veiculos';

export class VeiculoService {
  save(veiculo) {
    return api.post(`${url}`, veiculo);
  }

  update(veiculo) {
    return api.put(`${url}/${veiculo.id}`, veiculo);
  }

  delete(id) {
    return api.delete(`${url}/${id}`);
  }
  
  getVeiculos() {
    return api.get(`${url}`);
  }

  getById(id) {
    return api.get(`${url}/${id}`);
  }

  validate(veiculo) {
    const errors = [];

    if(!veiculo.modelo || veiculo.modelo.length < 2)
      errors.push("Modelo inválido");

    if(!veiculo.placa || veiculo.placa.length < 7)
      errors.push("Placa inválida");
    
    if(!veiculo.kmLitro || veiculo.kmLitro < 1 || veiculo.kmLitro > 50)
      errors.push("Consumo inválido")
    
    if(errors && errors.length > 0)
      throw new ErroValidcao(errors);
  }
}