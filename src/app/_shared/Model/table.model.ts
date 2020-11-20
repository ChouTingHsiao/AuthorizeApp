import { Observable } from 'rxjs';
export interface Column {
    header: string;
    columnDef: string;
    type: string;
    selector: string;
    source?: Observable<any>;
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
    sort: Sort;
    columns: Column[];
    read: () => Observable<any>;
    create: () => void;
    edit: (event: any) => void;
    delete: (event: any) => void;
}
