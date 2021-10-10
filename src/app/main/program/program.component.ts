import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialog } from '@shared/Model/dialog.model';
import { DialogComponent } from '@shared/Component/table/dialog/dialog.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid, Detail } from '@shared/Model/table.model';
import { Group } from '@shared/Model/group.model';
import { Program } from '@shared/Model/program.model';
import { Button } from '@shared/Model/button.model';
import { GroupService } from '@services/group/group.service';
import { Read, Create, Edit, Delete} from '@shared/Ngrx/Actions/maintain.action';
import { Observable } from 'rxjs';
import { getGroupsState, getButtonsState, getProgramsState } from '@shared/Ngrx/Selectors/maintain.selectors';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  openTableDialog: (dialog: Dialog) => any;

  openDetailDialog: (dialog: Dialog) => any;

  myGrid: Observable<Grid>;

  constructor(private store: Store,
              private groupService: GroupService) { }

  ngOnInit() {

    this.groupService.getAll().subscribe((groups) => {
      this.loadGrid(groups);
    });

  }

  loadGrid(groups: Group[]) {

    this.myGrid = new Observable(subscriber => {

      const grid = {
        tableName: TableEnum.Programs,
        sort: { active: 'id', direction: 'asc' },
        columns: [
          {
            header: 'Id',
            columnDef: 'id',
            type: ColumnEnum.string,
            selector: ColumnEnum.label,
            visible: false,
            cell: (groupElement: Program) => `${ groupElement.id }`,
          },
          {
            header: 'Name',
            columnDef: 'name',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (groupElement: Program) => `${ groupElement.name }`
          },
          {
            header: 'Remark',
            columnDef: 'remark',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (groupElement: Program) => `${ groupElement.remark }`
          },
          {
            header: 'LinkTag',
            columnDef: 'linkTag',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (groupElement: Program) => `${ groupElement.linkTag }`
          },
        ],
        detail: (program: Program): Observable<Detail> => {

          return new Observable(detailSubscriber => {

            const detail = {
              tableName: TableEnum.Buttons,
              sort: { active: 'id', direction: 'asc' },
              columns: [
                {
                  header: 'Id',
                  columnDef: 'id',
                  type: ColumnEnum.string,
                  selector: ColumnEnum.label,
                  visible: false,
                  cell: (buttonElement: Button) => `${ buttonElement.id }`
                },
                {
                  header: 'Name',
                  columnDef: 'name',
                  type: ColumnEnum.string,
                  selector: ColumnEnum.input,
                  cell: (buttonElement: Button) => `${ buttonElement.name }`
                },
                {
                  header: 'Remark',
                  columnDef: 'remark',
                  type: ColumnEnum.string,
                  selector: ColumnEnum.input,
                  cell: (buttonElement: Button) => `${ buttonElement.remark }`
                },
              ],
              read: (): Observable<any> => {

                this.store.dispatch( new Read<Button>(
                  `${TableEnum.Programs}.${TableEnum.Buttons}`,
                    [],
                    { program: program.id } as Button
                  )
                );

                return this.store.select(getButtonsState);

              },
              create: (): void => {

                const dialog: DialogComponent = this.openDetailDialog({
                  title: '新增頁面',
                  button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
                  method: DialogEnum.create,
                  data: {} as Button,
                });

                dialog.confirm = (): void => {

                  const buttonData = dialog.getData() as Button;

                  buttonData.program = program.id;

                  this.store.dispatch( new Create<Button>(
                    TableEnum.Buttons,
                    [],
                    buttonData)
                  );

                };

              },
              edit: (buttonElement: Button): void => {

                const dialog: DialogComponent = this.openDetailDialog({
                  title: '修改頁面',
                  button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
                  method: DialogEnum.edit,
                  data: buttonElement,
                });

                dialog.confirm = (): void => {

                  this.store.dispatch(
                    new Edit<Button>(
                      TableEnum.Buttons,
                      [],
                      dialog.getData() as Button
                    )
                  );

                };

              },
              delete: (buttonElement: Button): void => {

                const isCanDelete = confirm('Are you sure you want to delete this?');

                if (isCanDelete) {

                  this.store.dispatch(
                    new Delete<Button>(
                      TableEnum.Buttons,
                      [],
                      buttonElement
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

          this.store.dispatch( new Read<Program>(TableEnum.Programs) );

          return this.store.select(getProgramsState);

        },
        create: (): void => {

          const dialog: DialogComponent = this.openTableDialog({
            title: '新增頁面',
            button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
            method: DialogEnum.create,
            data: {} as Program,
            confirm: (): void => {

              this.store.dispatch(
                new Create<Program>(
                  TableEnum.Programs,
                  [],
                  dialog.getData() as Program
                )
              );

            },
          });

        },
        edit: (groupElement: Program): void => {

          const dialog: DialogComponent = this.openTableDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data: groupElement,
            confirm: (): void => {
              this.store.dispatch(
                new Edit<Program>(
                  TableEnum.Programs,
                  [],
                  dialog.getData() as Program
                )
              );
            },
          });

        },
        delete: (groupElement: Program): void => {

          const isCanDelete = confirm('Are you sure you want to delete this?');

          if (isCanDelete) {

            this.store.dispatch(
              new Delete<Program>(
                TableEnum.Programs,
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
