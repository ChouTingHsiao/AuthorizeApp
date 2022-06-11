import { Column } from '@shared/Model/table.model';

export interface IDialogInputComponent {
    column: Column;
    onChanges?: (event) => void;
}
