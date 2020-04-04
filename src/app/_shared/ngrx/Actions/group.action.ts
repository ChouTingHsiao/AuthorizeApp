import { MaintainPayload } from '@shared/ngrx/Actions/maintain.action';
import { TableEnum } from '@shared/Enum/table.enum';
import { DialogEnum } from '@shared/Enum/dialog.enum';


export const GROUPS_CREATE = `${TableEnum.Groups}.${DialogEnum.create}`;
export const GROUPS_READ   = `${TableEnum.Groups}.${DialogEnum.read}`;
export const GROUPS_EDIT   = `${TableEnum.Groups}.${DialogEnum.edit}`;
export const GROUPS_DELETE = `${TableEnum.Groups}.${DialogEnum.delete}`;


export class GroupsCreate<T> implements MaintainPayload<T> {
  type = GROUPS_CREATE;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class GroupsRead<T> implements MaintainPayload<T> {
  type = GROUPS_READ;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export class GroupsEdit<T> implements MaintainPayload<T> {
  type = GROUPS_EDIT;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export class GroupsDelete<T> implements MaintainPayload<T> {
  type = GROUPS_DELETE;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export type MaintainSuccessActions<T> =
  | GroupsCreate<T>
  | GroupsRead<T>
  | GroupsEdit<T>
  | GroupsDelete<T>;

