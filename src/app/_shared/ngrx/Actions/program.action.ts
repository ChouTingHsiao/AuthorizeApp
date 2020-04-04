import { MaintainPayload } from '@shared/ngrx/Actions/maintain.action';
import { TableEnum } from '@shared/Enum/table.enum';
import { DialogEnum } from '@shared/Enum/dialog.enum';


export const PROGRAMS_CREATE = `${TableEnum.Programs}.${DialogEnum.create}`;
export const PROGRAMS_READ   = `${TableEnum.Programs}.${DialogEnum.read}`;
export const PROGRAMS_EDIT   = `${TableEnum.Programs}.${DialogEnum.edit}`;
export const PROGRAMS_DELETE = `${TableEnum.Programs}.${DialogEnum.delete}`;


export class ProgramsCreate<T> implements MaintainPayload<T> {
  type = PROGRAMS_CREATE;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class ProgramsRead<T> implements MaintainPayload<T> {
  type = PROGRAMS_READ;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class ProgramsEdit<T> implements MaintainPayload<T> {
  type = PROGRAMS_EDIT;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class ProgramsDelete<T> implements MaintainPayload<T> {
  type = PROGRAMS_DELETE;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export type MaintainSuccessActions<T> =
  | ProgramsCreate<T>
  | ProgramsRead<T>
  | ProgramsEdit<T>
  | ProgramsDelete<T>;

