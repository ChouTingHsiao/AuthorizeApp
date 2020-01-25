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
    columns: Column[];
    displayedColumns: string[];
    dataSource: any;
    create: () => void;
    createDialog: () => void;
    edit: () => void;
    editDialog: (event: any) => void;
}
