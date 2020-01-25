export class Column {
    columnDef: string;
    header: string;
    type: string;
    cell: any;
}
export interface Schema {
    column: string;
    type: string;
    value: string;
}

export interface Sort {
    active: string;
    direction: string;
}

export interface Grid {
    dataSource: any;
    sort: Sort;
    columns: Column[];
    create: () => void;
    createDialog: () => void;
    edit: () => void;
    editDialog: (event: any) => void;
}
