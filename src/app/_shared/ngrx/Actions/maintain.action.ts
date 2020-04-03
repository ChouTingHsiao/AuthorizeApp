import { Action } from '@ngrx/store';
import { DialogEnum } from '@shared/Enum/dialog.enum';

export interface MaintainPayload<T> extends Action {
  actionPrefix: string;
  source?: T[];
  newData?: T;
}

export const CREATESUCCESS = `${ DialogEnum.create }.${ DialogEnum.success }`;
export const READSUCCESS   = `${ DialogEnum.read }.${ DialogEnum.success }`;
export const EDITSUCCESS   = `${ DialogEnum.edit }.${ DialogEnum.success }`;
export const DELETESUCCESS = `${ DialogEnum.delete }.${ DialogEnum.success }`;


export class CreateSuccess<T> implements MaintainPayload<T> {
  type = CREATESUCCESS;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
}

export class ReadSuccess<T> implements MaintainPayload<T> {
  type = READSUCCESS;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export class EditSuccess<T> implements MaintainPayload<T> {
  type = EDITSUCCESS;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export class DeleteSuccess<T> implements MaintainPayload<T> {
  type = DELETESUCCESS;
  constructor(public actionPrefix: string,
              public source?: T[],
              public newData?: T) { }
  }

export type MaintainSuccessActions<T> =
  | CreateSuccess<T>
  | ReadSuccess<T>
  | EditSuccess<T>
  | DeleteSuccess<T>;

