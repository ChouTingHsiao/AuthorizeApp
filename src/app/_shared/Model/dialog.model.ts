import { Schema } from './table.model';

export interface Dialog {
    title: string;
    button: string[];
    method: string;
    model: Schema[];
}
