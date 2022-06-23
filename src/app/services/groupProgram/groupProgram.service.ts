import { authorizeDb } from '@shared/Dexie/AuthorizeDb.dexie';
import { nanoid } from 'nanoid'
import { Injectable } from '@angular/core';
import { GroupProgram } from '@shared/Model/groupProgram.model';
import { Program } from '@shared/Model/program.model';
import { Button } from '@shared/Model/button.model';
import { ProgramService } from '@services/program/program.service';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';

@Injectable({
  providedIn: 'root'
})
export class GroupProgramService {

  constructor(private programService: ProgramService) {}

  getAll(): Observable<GroupProgram[]> {
    return new Observable(subscriber => {

      authorizeDb.GroupPrograms.toArray().then( (groupPrograms: GroupProgram[]) => {

        authorizeDb.Programs.toArray().then( (programs: Program[]) => {

          groupPrograms.forEach( group => {

            const authProgram = programs.filter(x => x.id ===  group.program);

            const isNotAuthEmpty = group.program !== '';

            const isAuthFound = authProgram !== undefined && authProgram.length > 0;

            if (isNotAuthEmpty && isAuthFound) {
              group.programName = authProgram[0].name;
            }

          });

          subscriber.next(groupPrograms);

          subscriber.complete();
        });
      });
    });
  }

  getByGroupId(groupId: string): Observable<GroupProgram[]> {
    return new Observable(subscriber => {

      authorizeDb.GroupPrograms.toArray().then( (groupPrograms: GroupProgram[])  => {

        authorizeDb.Programs.toArray().then( (programs: Program[]) => {

          authorizeDb.Buttons.toArray().then( (buttons: Button[]) => {

            const groupProgram = groupPrograms.filter( authGroupProgram => authGroupProgram.group === groupId);

            // 群組程式
            groupProgram.forEach( group => {

              const authProgram = programs.filter(x => x.id ===  group.program);

              authProgram.forEach( program => {

                const LinkedButtons = buttons.filter( button => button.program === program.id);

                program.buttons = LinkedButtons;

              });

              const isNotAuthEmpty = group.program !== '';

              const isAuthFound = authProgram !== undefined && authProgram.length > 0;

              if (isNotAuthEmpty && isAuthFound) {

                group.programName = authProgram[0].name;
              }

              if (authProgram.length > 0 &&
                  authProgram[0].buttons &&
                  authProgram[0].buttons.length > 0) {

                  group.buttonsName = group.buttons.map(x => {

                    const button = authProgram[0].buttons.filter(y => y.id === x);

                    return  button === undefined ? '' :  button[0].remark;

                  }).join(',');
              }

            });

            subscriber.next(groupProgram);

            subscriber.complete();
          });
        });
      });
    });
  }

  getByLink(linkName: string): Observable<Button[]> {
    return new Observable(subscriber => {

      const UserGroup: string = localStorage.getItem('UserGroup');

      this.getByGroupId(UserGroup).subscribe( (groupPrograms: GroupProgram[]) => {

        const linkGroupPrograms: GroupProgram[] = groupPrograms.filter( authGroupProgram => authGroupProgram.linkTag === linkName);

        const linkGroupProgram: GroupProgram = linkGroupPrograms.length < 1 ? null : linkGroupPrograms[0] ;

        if (linkGroupProgram !== null) {

          this.programService.getAll().subscribe( programs => {

            const linkProgram: Program = programs.filter( program => program.linkTag === linkName)[0];

            linkProgram.buttons.forEach( button => {
              button.isEnable = linkGroupProgram.buttons.includes(button.id);
            });

            subscriber.next(linkProgram.buttons);

            subscriber.complete();
          });

        } else {

          subscriber.next(null);

          subscriber.complete();
        }

      });
    });
  }

  create(groupProgram: GroupProgram): Observable<GroupProgram> {
    return new Observable(subscriber => {

      authorizeDb.Programs.toArray().then( (programs: Program[]) => {

        authorizeDb.Buttons.toArray().then( (buttons: Button[]) => {

          const cloneGroupProgram = clone(groupProgram) as GroupProgram;

          cloneGroupProgram.id = nanoid();

          const authProgram = programs.filter(x => x.id ===  cloneGroupProgram.program);

          authProgram.forEach( program => {

            const LinkedButtons = buttons.filter( button => button.program === program.id);

            program.buttons = LinkedButtons;
          });

          const isNotAuthEmpty = cloneGroupProgram.program !== '';

          const isAuthFound = authProgram !== undefined && authProgram.length > 0;

          if (isNotAuthEmpty && isAuthFound) {

            cloneGroupProgram.programName = authProgram[0].name;
          }

          if (authProgram.length > 0 &&
              authProgram[0].buttons &&
              authProgram[0].buttons.length > 0) {

                cloneGroupProgram.buttonsName = cloneGroupProgram.buttons.map(x => {

                  const button = authProgram[0].buttons.filter(y => y.id === x);

                  return  button === undefined ? '' :  button[0].remark;

                }).join(',');
          }

          authorizeDb.GroupPrograms.add(cloneGroupProgram).then((added) => {

            console.log(added);

            subscriber.next(cloneGroupProgram);

            subscriber.complete();
          });
        });
      });
    });
  }

  update(groupProgram: GroupProgram): Observable<GroupProgram> {
    return new Observable(subscriber => {

      authorizeDb.Programs.toArray().then( (programs: Program[]) => {

        authorizeDb.Buttons.toArray().then( (buttons: Button[]) => {

          const cloneGroupProgram = clone(groupProgram) as GroupProgram;

          const authProgram = programs.filter(x => x.id ===  cloneGroupProgram.program);

          authProgram.forEach( program => {

            const LinkedButtons = buttons.filter( button => button.program === program.id);

            program.buttons = LinkedButtons;
          });

          const isNotAuthEmpty = cloneGroupProgram.program !== '';

          const isAuthFound = authProgram !== undefined && authProgram.length > 0;

          if (isNotAuthEmpty && isAuthFound) {

            cloneGroupProgram.programName = authProgram[0].name;
          }

          if (authProgram.length > 0 &&
              authProgram[0].buttons &&
              authProgram[0].buttons.length > 0) {

                cloneGroupProgram.buttonsName = cloneGroupProgram.buttons.map(x => {

                  const button = authProgram[0].buttons.filter(y => y.id === x);

                  return  button === undefined ? '' :  button[0].remark;

                }).join(',');
          }

          authorizeDb.GroupPrograms.update(cloneGroupProgram.id, cloneGroupProgram).then((updated) => {

            console.log(updated);

            subscriber.next(cloneGroupProgram);

            subscriber.complete();
          });
        });
      });
    });
  }

  delete(groupProgram: GroupProgram): Observable<GroupProgram> {
    return new Observable(subscriber => {

      authorizeDb.GroupPrograms.delete(groupProgram.id).then((deleted) => {

        console.log(deleted);

        subscriber.next(groupProgram);

        subscriber.complete();
      });
    });
  }
}
