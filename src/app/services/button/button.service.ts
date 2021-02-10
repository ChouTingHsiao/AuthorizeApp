import { Injectable } from '@angular/core';
import { Button } from '@shared/Model/button.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';
import Dexie from 'dexie';

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

  getByProgramId(programId: string): Observable<Button[]> {

    return new Observable(subscriber => {

      GetAll(this.db, TableEnum.Buttons).then((x: Button[])  => {

        const programButton = x.filter(y => y.program === programId);

        subscriber.next(programButton);

        subscriber.complete();

      });

    });

  }

  create(button: Button): Observable<Button> {

    return new Observable(subscriber => {

      const cloneButton = clone(button);

      TableAdd(this.db, TableEnum.Buttons, cloneButton).then(() => {

        subscriber.next(cloneButton);

        subscriber.complete();

      });

    });

  }

  update(button: Button): Observable<Button> {

    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Buttons, button.id, button).then(() => {

        subscriber.next(button);

        subscriber.complete();

      });

    });

  }

  delete(button: Button): Observable<Button> {

    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Buttons, button.id).then(() => {

        subscriber.next(button);

        subscriber.complete();

      });

    });

  }

}
