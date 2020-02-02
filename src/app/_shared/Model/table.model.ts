export class Column {
    header: string;
    columnDef: string;
    type: string;
    selector: string;
    source?: [];
    visible?: boolean;
    value?: string;
    cell: any;
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
