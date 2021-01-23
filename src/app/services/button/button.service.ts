import { Injectable } from '@angular/core';
import { Button } from '@shared/Model/button.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
import Dexie from 'dexie';
import { Program } from '@src/app/_shared/Model/program.model';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  private db: Promise<Dexie>;

  constructor() {

    this.db = OpenDB();

  }

  getAll(): Observable<Button[]> {

    return new Observable(subscriber => {

      GetAll(this.db, TableEnum.Buttons).then(x => {

        subscriber.next(x);

        subscriber.complete();

      });

    });

  }

  getByProgramId(button: Button): Observable<Button[]> {

    return new Observable(subscriber => {

      GetAll(this.db, TableEnum.Buttons).then((x: Button[])  => {

        const programButton = x.filter(y => y.program === button.program);

        subscriber.next(programButton);

        subscriber.complete();

      });

    });

  }

  create(button: Button): Observable<Button[]> {

    return new Observable(subscriber => {

      TableAdd(this.db, TableEnum.Buttons, button).then(() => {

        GetAll(this.db, TableEnum.Buttons).then(x => {

          subscriber.next(x);

          subscriber.complete();

        });

      });

    });

  }

  update(button: Button): Observable<Button[]> {

    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Buttons, button.id, button).then(() => {

        GetAll(this.db, TableEnum.Buttons).then(x => {

          subscriber.next(x);

          subscriber.complete();

        });

      });

    });

  }

  delete(button: Button): Observable<Button[]> {

    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Buttons, button.id).then(() => {

        GetAll(this.db, TableEnum.Buttons).then(x => {

          subscriber.next(x);

          subscriber.complete();

        });

      });

    });

  }

}
