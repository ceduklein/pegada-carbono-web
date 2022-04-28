import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button"
import { FiEdit, FiTrash2 } from "react-icons/fi"

export function TableColaborador(props) {
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
  const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

  const formatBoolean = (rowData) => rowData.habilitado ? "Sim" : "Não";

  const actionButtons = (rowData) => {
    return (
      <>
        <button type='button'
          title="Editar"
          onClick={e => props.onClickEdit(rowData.id)} 
          className="btn btn-primary btn-action">
          <FiEdit size={16}/>
        </button>
        <button type='button'
          title="Excluir"
          onClick={e => props.onClickDelete(rowData)} 
          className="btn btn-danger btn-action">
          <FiTrash2 size={16}/>
        </button>
      </>
    )
  }

  return(
    <DataTable value={props.data}
      removableSort
      resizableColumns
      columnResizeMode="fit"
      paginator
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      rows={10} rowsPerPageOptions={[10,20,30,40,50]}
      paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
      className="p-datatable-sm p-datatable-striped">

        <Column field="id" header="Id" sortable />
        <Column field="nome" header="Nome" sortable />
        <Column field="habilitado" body={formatBoolean} header="Habilitado" sortable />
        <Column body={actionButtons} header="Ação" />

      </DataTable>

  )
}