import { Observable } from 'rxjs';
export interface Column {
    header: string;
    columnDef: string;
    displayName?: string;
    type: string;
    selector: string;
    source?: () => Observable<any>;
    visible?: boolean;
    value?: string;
    cell?: any;
}

export interface TableSort {
    active: string;
    direction: string;
}

export interface Grid {
    tableName: string;
    sort: TableSort;
    columns: Column[];
    detail?: (element: any) => Observable<Detail>;
    read: () => Observable<any>;
    create: () => void;
    edit: (element: any, event?: any) => void;
    delete: (element: any, event?: any) => void;
}

export interface Detail {
    tableName: string;
    sort: TableSort;
    columns: Column[];
    read?: () => Observable<any>;
    create?: () => void;
    edit?: (element: any, event?: any) => void;
    delete?: (element: any, event?: any) => void;
}
