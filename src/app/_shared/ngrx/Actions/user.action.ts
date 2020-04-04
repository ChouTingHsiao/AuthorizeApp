import { MaintainPayload } from '@shared/ngrx/Actions/maintain.action';
import { TableEnum } from '@shared/Enum/table.enum';
import { DialogEnum } from '@shared/Enum/dialog.enum';


export const USERS_CREATE = `${TableEnum.Users}.${DialogEnum.create}`;
export const USERS_READ   = `${TableEnum.Users}.${DialogEnum.read}`;
export const USERS_EDIT   = `${TableEnum.Users}.${DialogEnum.edit}`;
export const USERS_DELETE = `${TableEnum.Users}.${DialogEnum.delete}`;


export class UsersCreate<T> implements MaintainPayload<T> {
  type = USERS_CREATE;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class UsersRead<T> implements MaintainPayload<T> {
  type = USERS_READ;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export class UsersEdit<T> implements MaintainPayload<T> {
  type = USERS_EDIT;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export class UsersDelete<T> implements MaintainPayload<T> {
  type = USERS_DELETE;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export type MaintainSuccessActions<T> =
  | UsersCreate<T>
  | UsersRead<T>
  | UsersEdit<T>
  | UsersDelete<T>;

