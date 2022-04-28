import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import { Card } from "../components/Card";

export function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="jumbotron" style={{padding:'10px', marginTop:'-30px'}}>
      <Card title="EMPRESA Y - CONTROLE DE FROTA E EMISSÃO DE CO²">
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Escopo">
              <p className="text-muted" style={{textAlign: 'justify'}}>
                De acordo com a WWF, fundação que visa mudar a atual trajetória de degradação socioambiental, a pegada de carbono da humanidade é a principal causa das mudanças climáticas. Devido ao fato de que geramos emissões gás carbônico em ritmo muito mais rápido do que é possível absorver, existe um acúmulo de gás carbônico na atmosfera e no oceano. 
              </p>
              <p className="text-muted" style={{textAlign: 'justify'}}>
                Tendo em vista a necessidade de medidas efetivas para redução do impacto ambiental, a empresa Y necessita medir a "pegada de carbono" relativa à emissão de CO2 da sua frota de veículos utilizados por seus colaboradores. Para isso, solicitou o desenvolvimento de um MVP de um sistema que possa realizar este tipo de controle.
              </p>
              <p className="text-muted" style={{textAlign: 'justify'}}>
                A empresa Y é uma organização de suporte de rede que atua em toda a grande Florianópolis desde 2011. Ao todo a empresa possui 107 colaboradores alocados em sua base na região central de Florianópolis. 
              </p>
              <p className="text-muted" style={{textAlign: 'justify'}}>
                A Empresa Y possui 22 colaboradores habilitados a conduzir os veículos de atendimento. Quando um chamado é aberto é verificado o endereço de atendimento e é alocado um carro disponível e colaborador habilitado para a condução do veículo. Ao finalizar o chamado deve ser cadastrada a quilometragem pelo colaborador. 
              </p>
          </TabPanel>
          <TabPanel header="Cálculo CO²">
              <h4>Cálculo de CO2 emitido por litro de gasolina</h4>
              <br/>
              <p className="text-muted">
                <strong>CG x 0,82 x 0,75 x 3,7 = total de kg CO2 emitido por litro</strong>
              </p>
              <ul>
                <li className="text-muted">
                  CG = consumo de gasolina, em litros
                </li>
                <li className="text-muted">
                  0,82 = percentual de gasolina em um litro, descontado o percentual de etanol
                </li>
                <li className="text-muted">
                  0,75 = densidade da gasolina
                </li>
                <li className="text-muted">
                  3,7 = fator de transformação da gasolina em CO2
                </li>
              </ul>
              <p className="text-muted">
                Fonte: 
                <a href="https://esalqlastrop.com.br/capa.asp?pi=calculadora_emissoes" style={{marginLeft: '5px'}}>
                  https://esalqlastrop.com.br/capa.asp?pi=calculadora_emissoes
                </a>
              </p>


          </TabPanel>
          <TabPanel header="Requisitos">
            <ul>
              <li className="text-muted">
                O sistema deve permitir cadastrar, visualizar, alterar e excluir um funcionário. 
              </li>
              <li className="text-muted">
                O sistema deve permitir cadastrar, visualizar, alterar e excluir um veículo.
              </li>
              <li className="text-muted">
                O sistema deve permitir cadastrar, visualizar, alterar e excluir um chamado.
              </li>
              <li className="text-muted">
                O sistema deve calcular e exibir o total de kg de CO2 emitido por chamado. 
              </li>
              <li className="text-muted">
                Todo chamado deve possuir um funcionário, um veículo e uma distância percorrida. 
              </li>
              <li className="text-muted">
                O sistema deve possuir uma interface gráfica para a interação com o usuário. 
              </li>
            </ul>
          </TabPanel>
        </TabView>    
      </Card>
    </div>
  )
}