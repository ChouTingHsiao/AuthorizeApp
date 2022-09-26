import { Column } from '@shared/Model/table.model';
import { Observable } from 'rxjs';

export interface IDialogInputComponent {
    column: Column;
    source?: Observable<unknown>;
    onChanges?: (event) => void;
}
