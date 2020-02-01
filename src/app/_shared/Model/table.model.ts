export class Column {
    header: string;
    columnDef: string;
    type: string;
    selector: string;
    source?: [];
    cell: any;
}
export interface Schema {
    column: string;
    selector: string;
    source?: [];
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
