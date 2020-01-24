export interface Column {
    columnDef: string;
    header: string;
    cell: any;
}
export interface Schema {
    column: string;
    type: string;
    value: string;
}

export interface Grid {
    SCHEMA: Schema[];
    columns: Column[];
    displayedColumns: string[];
    dataSource: any;
}
