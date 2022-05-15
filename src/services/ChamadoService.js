import api from "../api/api";
import { ErroValidcao } from "../exception/erroValidacao";

const url = "/chamados";

export class ChamadoService {
  save(chamado) {
    return api.post(`${url}`, chamado);
  }

  update(chamado) {
    return api.put(`${url}/${chamado.id}`, chamado);
  }

  delete(id) {
    return api.delete(`${url}/${id}`)
  }

  finish(id) {
    return api.put(`${url}/encerrar/${id}`);
  }

  getChamados() {
    return api.get(`${url}`);
  }

  getById(id) {
    return api.get(`${url}/${id}`);
  }

  validate(chamado) {
    const errors = [];

    if (!chamado.colaborador)
      errors.push("Selecione um colaborador");
    
    if (!chamado.veiculo)
      errors.push("Selecione um veículo");

    if (!chamado.endereco || chamado.endereco.length < 3)
      errors.push("Endereço inválido");
    
    if (!chamado.distancia || chamado.distancia < 1 )
      errors.push("Distância inválida");
    
    if(errors && errors.length > 0)
      throw new ErroValidcao(errors);
  }

  validateUpdate(chamado) {
    const errors = [];

    if (!chamado.endereco || chamado.endereco.length < 3)
      errors.push("Endereço inválido");
  
    if (!chamado.distancia || chamado.distancia < 1 )
      errors.push("Distância inválida");
  
    if(errors && errors.length > 0)
      throw new ErroValidcao(errors);
  }
}