import { MaintainPayload } from '@shared/ngrx/Actions/maintain.action';
import { TableEnum } from '@shared/Enum/table.enum';
import { DialogEnum } from '@shared/Enum/dialog.enum';


export const MENUS_CREATE = `${TableEnum.Menus}.${DialogEnum.create}`;
export const MENUS_READ   = `${TableEnum.Menus}.${DialogEnum.read}`;
export const MENUS_EDIT   = `${TableEnum.Menus}.${DialogEnum.edit}`;
export const MENUS_DELETE = `${TableEnum.Menus}.${DialogEnum.delete}`;


export class MenusCreate<T> implements MaintainPayload<T> {
  type = MENUS_CREATE;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class MenusRead<T> implements MaintainPayload<T> {
  type = MENUS_READ;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export class MenusEdit<T> implements MaintainPayload<T> {
  type = MENUS_EDIT;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export class MenusDelete<T> implements MaintainPayload<T> {
  type = MENUS_DELETE;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export type MaintainSuccessActions<T> =
  | MenusCreate<T>
  | MenusRead<T>
  | MenusEdit<T>
  | MenusDelete<T>;

