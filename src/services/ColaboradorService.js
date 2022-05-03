import api from "../api/api";
import { ErroValidcao } from "../exception/erroValidacao";

const url = '/colaboradores';

export class ColaboradorService {
  save(colaborador) {
    return api.post(`${url}`, colaborador);
  }

  update(colaborador) {
    return api.put(`${url}/${colaborador.id}`, colaborador);
  }

  delete(id) {
    return api.delete(`${url}/${id}`);
  }

  getColaboradores() {
    return api.get(`${url}`);
  }

  getById(id) {
    return api.get(`${url}/${id}`);
  }

  validate(colaborador) {
    const errors = [];

    if(!colaborador.nome || colaborador.nome.length < 3)
      errors.push("Informe um nome válido");
    
    if(errors && errors.length > 0)
      throw new ErroValidcao(errors);
  }
}