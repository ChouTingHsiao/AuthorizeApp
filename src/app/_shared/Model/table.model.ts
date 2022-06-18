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

export interface Grid<T, U = unknown> {
    tableName: string;
    sort: TableSort;
    columns: Column[];
    detail?: (element: T) => Observable<Detail<U>>;
    read: () => Observable<unknown>;
    create: () => void;
    edit: (element: T, event?: unknown) => void;
    delete: (element: T, event?: unknown) => void;
}

export interface Detail<T> {
    tableName: string;
    sort: TableSort;
    columns: Column[];
    read?: () => Observable<unknown>;
    create?: () => void;
    edit?: (element: T, event?: unknown) => void;
    delete?: (element: T, event?: unknown) => void;
}
