import { Button } from '@shared/Model/button.model';

export interface Program {
    id: string;
    name: string;
    remark: string;
    linkTag: string;
    auth: string;
    buttons?: Button[];
}
