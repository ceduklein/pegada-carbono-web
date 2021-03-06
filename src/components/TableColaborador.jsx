import { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from 'primereact/api';
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { InputText } from 'primereact/inputtext';

export function TableColaborador(props) {
  const formatBoolean = (rowData) => rowData.habilitado ? "Sim" : "Não";

  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

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

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar" />
        </span>
      </div>
    )
  }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;

    let _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }
  
  const header = renderHeader();

  return(
    <DataTable value={props.data} header={header} dataKey="id" 
      removableSort
      resizableColumns
      filterDisplay="row" filters={filters}
      globalFilterFields={['id', 'nome', 'habilitado']}
      columnResizeMode="fit"
      paginator
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      rows={10} rowsPerPageOptions={[10,20,30,40,50]}
      className="p-datatable-sm p-datatable-striped">

        <Column field="id" header="Id" sortable />
        <Column field="nome" header="Nome" sortable />
        <Column field="habilitado" body={formatBoolean} header="Habilitado" sortable />
        <Column body={actionButtons} header="Ação" />
      </DataTable>
  )
}