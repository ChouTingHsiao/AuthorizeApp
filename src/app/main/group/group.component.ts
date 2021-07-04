import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialog } from '@shared/Model/dialog.model';
import { DialogComponent } from '@shared/Component/table/dialog/dialog.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid, Detail } from '@shared/Model/table.model';
import { Role } from '@shared/Model/role.model';
import { Group } from '@shared/Model/group.model';
import { GroupProgram } from '@shared/Model/groupProgram.model';
import { Program } from '@shared/Model/program.model';
import { Button } from '@shared/Model/button.model';
import { RoleService } from '@services/role/role.service';
import { ProgramService } from '@services/program/program.service';
import { Read, Create, Edit, Delete} from '@shared/Ngrx/Actions/maintain.action';
import { Observable } from 'rxjs';
import { getRolesState, getProgramsState, getButtonsState, getGroupProgramsState, getGroupsState } from '@shared/Ngrx/Selectors/maintain.selectors';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  openTableDialog: (dialog: Dialog) => any;

  openDetailDialog: (dialog: Dialog) => any;

  myGrid: Observable<Grid>;

  constructor(private store: Store,
              private roleService: RoleService,
              private programService: ProgramService) { }

  ngOnInit() {

    this.roleService.getAll().subscribe((roles) => {
      this.programService.getAll().subscribe((programs) => {
        this.loadGrid(roles, programs);
      });
    });

  }

  loadGrid(roles: Role[], programs: Program[]) {

    this.myGrid = new Observable(subscriber => {

      const grid = {
        tableName: TableEnum.Groups,
        sort: { active: 'id', direction: 'asc' },
        columns: [
          {
            header: 'Id',
            columnDef: 'id',
            type: ColumnEnum.string,
            selector: ColumnEnum.label,
            visible: false,
            cell: (groupElement: Group) => `${ groupElement.id }`
          },
          {
            header: 'Name',
            columnDef: 'name',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (groupElement: Group) => `${ groupElement.name }`
          },
          {
            header: 'Roles',
            columnDef: 'roles',
            type: ColumnEnum.string,
            selector: ColumnEnum.multiselect,
            source: (): Observable<any> => {

              this.store.dispatch( new Read<Role>(TableEnum.Roles) );

              return this.store.select(getRolesState);
            },
            cell: (groupElement: Group) => `${
              groupElement.roles.map(x => {
                const role = roles.filter(y => y.id === x)[0];
                return  role ? role.name : '';
              }).join(',')
            }`
          },
        ],
        detail: (group: Group): Observable<Detail> => {

          return new Observable(detailSubscriber => {

            const detail = {
              tableName: TableEnum.GroupPrograms,
              sort: { active: 'id', direction: 'asc' },
              columns: [
                {
                  header: 'Id',
                  columnDef: 'id',
                  type: ColumnEnum.string,
                  selector: ColumnEnum.label,
                  visible: false,
                  cell: (groupProgramElement: GroupProgram) => `${ groupProgramElement.id }`
                },
                {
                  header: 'Name',
                  columnDef: 'name',
                  type: ColumnEnum.string,
                  selector: ColumnEnum.input,
                  cell: (groupProgramElement: GroupProgram) => `${ groupProgramElement.name }`
                },
                {
                  header: 'Program',
                  columnDef: 'program',
                  type: ColumnEnum.string,
                  selector: ColumnEnum.select,
                  source: (): Observable<any> => {

                    this.store.dispatch( new Read<Program>(TableEnum.Programs) );

                    return this.store.select(getProgramsState);
                  },
                  cell: (groupProgramElement: GroupProgram): string => {

                      let authProgramName = '';

                      const authProgram = programs.filter(x => x.id ===  groupProgramElement.program);

                      const isNotAuthEmpty = groupProgramElement.program !== '';

                      const isAuthFound = authProgram !== undefined && authProgram.length > 0;

                      if (isNotAuthEmpty && isAuthFound) {
                        authProgramName = authProgram[0].name;
                      }

                      return authProgramName;

                  }
                },
                {
                  header: 'Button',
                  columnDef: 'buttons',
                  type: ColumnEnum.string,
                  selector: ColumnEnum.multiselect,
                  source: (): Observable<any> => {

                    return this.store.select(getButtonsState);

                  },
                  cell: (groupProgramElement: GroupProgram) => {

                    const programButtons = programs.filter(x => x.id === groupProgramElement.program);

                    if (programButtons.length > 0 &&
                        programButtons[0].buttons &&
                        programButtons[0].buttons.length > 0) {

                      return `${
                        groupProgramElement.buttons.map(x => {

                          const button = programButtons[0].buttons.filter(y => y.id === x);

                          return  button === undefined ? '' :  button[0].remark;

                        }).join(',')
                      }`;

                    }

                    return '';

                  }
                },
              ],
              read: (): Observable<any> => {

                this.store.dispatch( new Read<GroupProgram>(
                  `${TableEnum.Groups}.${TableEnum.GroupPrograms}`,
                    [],
                    { group: group.id } as GroupProgram
                  )
                );

                return this.store.select(getGroupProgramsState);

              },
              create: (): void => {

                const dialog: DialogComponent = this.openDetailDialog({
                  title: '新增頁面',
                  button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
                  method: DialogEnum.create,
                  data: {} as GroupProgram,
                  onChanges: (event) => {

                    if ( event.source.ngControl.name === 'program' ) {

                      this.store.dispatch( new Read<Button>(
                        `${TableEnum.Programs}.${TableEnum.Buttons}`,
                          [],
                          { program: event.value } as Button
                        )
                      );

                    }

                  },
                  confirm: (): void => {

                    const groupProgramData = dialog.getData() as GroupProgram;

                    groupProgramData.group = group.id;

                    this.store.dispatch( new Create<GroupProgram>(
                      TableEnum.GroupPrograms,
                      [],
                      groupProgramData)
                    );

                  }
                });

              },
              edit: (groupProgram: GroupProgram): void => {

                this.store.dispatch( new Read<Button>(
                  `${TableEnum.Programs}.${TableEnum.Buttons}`,
                    [],
                    { program: groupProgram.program } as Button
                  )
                );

                const dialog: DialogComponent = this.openDetailDialog({
                  title: '修改頁面',
                  button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
                  method: DialogEnum.edit,
                  data: groupProgram,
                  onChanges: (event) => {

                    if ( event.source.ngControl.name === 'program' ) {

                      this.store.dispatch( new Read<Button>(
                        `${TableEnum.Programs}.${TableEnum.Buttons}`,
                          [],
                          { program: event.value } as Button
                        )
                      );

                    }

                  },
                  confirm: (): void => {

                    this.store.dispatch(
                      new Edit<GroupProgram>(
                        TableEnum.GroupPrograms,
                        [],
                        dialog.getData() as GroupProgram
                      )
                    );

                  },

                });

              },
              delete: (groupProgram: GroupProgram): void => {

                const isCanDelete = confirm('Are you sure you want to delete this?');

                if (isCanDelete) {

                  this.store.dispatch(
                    new Delete<GroupProgram>(
                      TableEnum.GroupPrograms,
                      [],
                      groupProgram
                    )
                  );

                }

              }
            };

            detailSubscriber.next(detail);
            detailSubscriber.complete();

          });

        },
        read: (): Observable<any> => {

          this.store.dispatch( new Read<Group>(TableEnum.Groups) );

          return this.store.select(getGroupsState);

        },
        create: (): void => {

          const dialog: DialogComponent = this.openTableDialog({
            title: '新增頁面',
            button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
            method: DialogEnum.create,
            data: {} as Group,
            confirm: (): void => {

              this.store.dispatch(
                new Create<Group>(
                  TableEnum.Groups,
                  [],
                  dialog.getData() as Group
                )
              );

            },
          });

        },
        edit: (groupElement: Group): void => {

          const dialog: DialogComponent = this.openTableDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data: groupElement,
            confirm: (): void => {

              this.store.dispatch(
                new Edit<Group>(
                  TableEnum.Groups,
                  [],
                  dialog.getData() as Group
                )
              );

            },
          });

        },
        delete: (groupElement: Group): void => {

          const isCanDelete = confirm('Are you sure you want to delete this?');

          if (isCanDelete) {

            this.store.dispatch(
              new Delete<Group>(
                TableEnum.Groups,
                [],
                groupElement
              )
            );

          }

        }
      };

      subscriber.next(grid);

      subscriber.complete();

    });

  }

}
