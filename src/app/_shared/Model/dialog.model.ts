import { Schema } from '@shared/Model/table.model';

export interface Dialog {
    title: string;
    button: string[];
    method: string;
    model: Schema[];
}
