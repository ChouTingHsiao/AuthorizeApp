import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { GroupProgram } from '@shared/Model/groupProgram.model';
import { Program } from '@shared/Model/program.model';
import { Button } from '@shared/Model/button.model';
import { ProgramService } from '@services/program/program.service';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';

@Injectable({
  providedIn: 'root'
})
export class GroupProgramService {

  private db: Promise<Dexie>;

  constructor(private programService: ProgramService) {

    this.db = OpenDB();
  }

  getAll(): Observable<GroupProgram[]> {
    return new Observable(subscriber => {

      GetAll(this.db, TableEnum.GroupPrograms).then( (groupPrograms: GroupProgram[]) => {

        GetAll(this.db, TableEnum.Programs).then( (programs: Program[]) => {

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

      GetAll(this.db, TableEnum.GroupPrograms).then( (groupPrograms: GroupProgram[])  => {

        GetAll(this.db, TableEnum.Programs).then( (programs: Program[]) => {

            GetAll(this.db, TableEnum.Buttons).then( (buttons: Button[]) => {

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

      GetAll(this.db, TableEnum.Programs).then( (programs: Program[]) => {

        GetAll(this.db, TableEnum.Buttons).then( (buttons: Button[]) => {

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

          TableAdd(this.db, TableEnum.GroupPrograms, cloneGroupProgram).then(() => {

            subscriber.next(cloneGroupProgram);

            subscriber.complete();
          });

        });

      });

    });
  }

  update(groupProgram: GroupProgram): Observable<GroupProgram> {
    return new Observable(subscriber => {

      GetAll(this.db, TableEnum.Programs).then( (programs: Program[]) => {

        GetAll(this.db, TableEnum.Buttons).then( (buttons: Button[]) => {

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

          TableUpdate(this.db, TableEnum.GroupPrograms, groupProgram.id, cloneGroupProgram).then(() => {

            subscriber.next(cloneGroupProgram);

            subscriber.complete();
          });

        });

      });

    });
  }

  delete(groupProgram: GroupProgram): Observable<GroupProgram> {
    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.GroupPrograms, groupProgram.id).then(() => {

        subscriber.next(groupProgram);

        subscriber.complete();
      });

    });
  }

}
