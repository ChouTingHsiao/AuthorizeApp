import { authorizeDb } from '@shared/Dexie/AuthorizeDb.dexie';
import { nanoid } from 'nanoid'
import { Injectable } from '@angular/core';
import { Button } from '@shared/Model/button.model';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  constructor() {}

  getAll(): Observable<Button[]> {
    return new Observable(subscriber => {

      authorizeDb.Buttons.toArray().then( (buttons: Button[]) => {

        subscriber.next(buttons);

        subscriber.complete();
      });
    });
  }

  getByProgramId(programId: string): Observable<Button[]> {
    return new Observable(subscriber => {

      authorizeDb.Buttons.toArray().then( (buttons: Button[]) => {

        const programButton = buttons.filter( button => button.program === programId);

        subscriber.next(programButton);

        subscriber.complete();
      });
    });
  }

  create(button: Button): Observable<Button> {
    return new Observable(subscriber => {

      const cloneButton = clone(button) as Button;

      cloneButton.id = nanoid();

      authorizeDb.Buttons.add(cloneButton).then((added) => {

        console.log(added);

        subscriber.next(cloneButton);

        subscriber.complete();
      });
    });
  }

  update(button: Button): Observable<Button> {
    return new Observable(subscriber => {

      authorizeDb.Buttons.toArray().then((updated) => {

        console.log(updated);

        subscriber.next(button);

        subscriber.complete();
      });
    });
  }

  delete(button: Button): Observable<Button> {
    return new Observable(subscriber => {

      authorizeDb.Buttons.delete(button.id).then(() => {

        subscriber.next(button);

        subscriber.complete();
      });
    });
  }
}
