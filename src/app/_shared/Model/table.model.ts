import { Observable } from 'rxjs';
export interface Column {
    header: string;
    columnDef: string;
    displayName?: string;
    type: string;
    selector: string;
    source?: () => Observable<unknown>;
    visible?: boolean;
    value?: string;
    cell?: unknown;
}

export interface TableSort {
    active: string;
    direction: string;
}

export interface Grid {
    tableName: string;
    sort: TableSort;
    columns: Column[];
    detail?: (element: unknown) => Observable<Detail>;
    read: () => Observable<unknown>;
    create: () => void;
    edit: (element: unknown, event?: unknown) => void;
    delete: (element: unknown, event?: unknown) => void;
}

export interface Detail {
    tableName: string;
    sort: TableSort;
    columns: Column[];
    read?: () => Observable<unknown>;
    create?: () => void;
    edit?: (element: unknown, event?: unknown) => void;
    delete?: (element: unknown, event?: unknown) => void;
}
