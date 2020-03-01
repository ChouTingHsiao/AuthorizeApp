export interface Column {
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
    tableName: string;
    dataSource: any;
    sort: Sort;
    columns: Column[];
    create: () => void;
    createDialog: () => void;
    edit: () => void;
    editDialog: (event: any) => void;
    delete: (event: any) => void;
}
