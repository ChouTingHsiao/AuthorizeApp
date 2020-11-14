import { Action } from '@ngrx/store';
import { DialogEnum } from '@shared/Enum/dialog.enum';

export interface MaintainPayload<T> extends Action {
  actionPrefix: string;
  source?: T[];
  newData?: T;
}

export const CREATE_SUCCESS = `${ DialogEnum.create }.${ DialogEnum.success }`;
export const READ_SUCCESS   = `${ DialogEnum.read }.${ DialogEnum.success }`;
export const EDIT_SUCCESS   = `${ DialogEnum.edit }.${ DialogEnum.success }`;
export const DELETE_SUCCESS = `${ DialogEnum.delete }.${ DialogEnum.success }`;


export class Read<T> implements MaintainPayload<T> {
  type = `${this.actionPrefix}.${DialogEnum.read}`;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class Create<T> implements MaintainPayload<T> {
  type = `${this.actionPrefix}.${DialogEnum.create}`;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class Edit<T> implements MaintainPayload<T> {
  type = `${this.actionPrefix}.${DialogEnum.edit}`;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class Delete<T> implements MaintainPayload<T> {
  type = `${this.actionPrefix}.${DialogEnum.delete}`;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class ReadSuccess<T> implements MaintainPayload<T> {
  type = READ_SUCCESS;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class CreateSuccess<T> implements MaintainPayload<T> {
  type = CREATE_SUCCESS;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class EditSuccess<T> implements MaintainPayload<T> {
  type = EDIT_SUCCESS;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class DeleteSuccess<T> implements MaintainPayload<T> {
  type = DELETE_SUCCESS;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export type MaintainSuccessActions<T> =
  | Read<T>
  | Create<T>
  | Edit<T>
  | Delete<T>
  | ReadSuccess<T>
  | CreateSuccess<T>
  | EditSuccess<T>
  | DeleteSuccess<T>;

