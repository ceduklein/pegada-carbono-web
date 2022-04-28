import { useEffect, useState } from "react"
import api from "../api/api";
import { Card } from "../components/Card";
import { TableColaborador } from "../components/TableColaborador";

export function Colaborador() {
  const [colaboradores, setColaboradores] = useState([]);

  
  useEffect(() => {
    getColaboradores();
  } ,[]);

  const getColaboradores = async () => {
    const response = await api.get("/colaboradores");
    setColaboradores(response.data);
  }

  return (
    <div className="jumbotron" style={{padding: '10px', marginTop: '-30px'}}>
      <Card title="Colaboradores">

        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <TableColaborador data={colaboradores} />
            </div>
          </div>
        </div>

      </Card>
    </div>
  )
}