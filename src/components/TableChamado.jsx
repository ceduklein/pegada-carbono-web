import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaFlagCheckered } from "react-icons/fa";


export function TableChamado(props) {
  // const formatBoolean = (rowData) => rowData.disponivel ? "Disponível" : "Indisponível";

  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

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

  const actionButtons = (rowData) => {
    return (
      <>
        <button type='button'
          title="Encerrar"
          onClick={e => props.onClickFinish(rowData)} 
          className="btn btn-secondary btn-action">
          <FaFlagCheckered size={16}/>
        </button>
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

  const header = renderHeader();

  return(
    <DataTable value={props.data} header={header} dataKey="id"
      removableSort
      resizableColumns
      filterDisplay="row" filters={filters}
      globalFilterFields={['id', 'dataInicio', 'endereco', 'distancia', 'pegadaCarbono']}
      columnResizeMode="fit"
      paginator
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      rows={10} rowsPerPageOptions={[10,20,30,40,50]}
      className="p-datatable-sm p-datatable-striped">

        <Column field="id" header="Id" sortable />
        <Column field="dataInicio" header="Data" sortable />
        <Column field="endereco" header="Endereço" sortable />
        <Column field="distancia" header="Distancia" sortable />
        <Column field="pegadaCarbono" header="CO²" sortable />
        
        <Column body={actionButtons} header="Ação" />

      </DataTable>
  )
}
                 