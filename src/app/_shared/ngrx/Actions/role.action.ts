import { MaintainPayload } from '@shared/ngrx/Actions/maintain.action';
import { TableEnum } from '@shared/Enum/table.enum';
import { DialogEnum } from '@shared/Enum/dialog.enum';


export const ROLES_CREATE = `${TableEnum.Roles}.${DialogEnum.create}`;
export const ROLES_READ   = `${TableEnum.Roles}.${DialogEnum.read}`;
export const ROLES_EDIT   = `${TableEnum.Roles}.${DialogEnum.edit}`;
export const ROLES_DELETE = `${TableEnum.Roles}.${DialogEnum.delete}`;


export class RolesCreate<T> implements MaintainPayload<T> {
  type = ROLES_CREATE;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class RolesRead<T> implements MaintainPayload<T> {
  type = ROLES_READ;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export class RolesEdit<T> implements MaintainPayload<T> {
  type = ROLES_EDIT;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export class RolesDelete<T> implements MaintainPayload<T> {
  type = ROLES_DELETE;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export type MaintainSuccessActions<T> =
  | RolesCreate<T>
  | RolesRead<T>
  | RolesEdit<T>
  | RolesDelete<T>;

