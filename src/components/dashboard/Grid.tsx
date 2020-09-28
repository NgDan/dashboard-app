import React, { FC, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

interface GridProps {
  dashboardData: Array<Object>;
}

const Grid: FC<GridProps> = ({ dashboardData }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null) as any;

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onFirstDataRendered = (params: any) => {
    gridColumnApi?.autoSizeColumns?.(['DESCRIPTION']);
  };

  type IorderProperties = 'NO_DATA' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

  const orderProperties: IorderProperties[] = [
    'NO_DATA',
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL',
  ];
  const order = { NO_DATA: 0, LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
  const customSeverityComparator = (
    prevItem: IorderProperties,
    item: IorderProperties
  ): number => {
    if (orderProperties.includes(prevItem) && orderProperties.includes(item)) {
      return order[prevItem] - order[item];
    }
    return 0;
  };
  const customDateComparator = (date1: string, date2: string): number => {
    return new Date(date1).valueOf() - new Date(date2).valueOf();
  };

  return (
    <div className='ag-theme-alpine' style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={dashboardData}
        pagination={true}
        onFirstDataRendered={onFirstDataRendered}
        onGridReady={onGridReady}
      >
        <AgGridColumn field='CVE ID' sortable={true}></AgGridColumn>
        <AgGridColumn
          field='PUBLISHED DATE'
          sortable={true}
          comparator={customDateComparator}
        ></AgGridColumn>
        <AgGridColumn
          field='SEVERITY'
          sortable={true}
          comparator={customSeverityComparator}
        ></AgGridColumn>
        <AgGridColumn
          field='DESCRIPTION'
          sortable={true}
          suppressSizeToFit={false}
        ></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default Grid;
