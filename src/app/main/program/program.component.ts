import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialog } from '@shared/Model/dialog.model';
import { DialogComponent } from '@shared/Component/table/dialog/dialog.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid, Detail } from '@shared/Model/table.model';
import { Program } from '@shared/Model/program.model';
import { Button } from '@shared/Model/button.model';
import { Read, Create, Edit, Delete} from '@shared/Ngrx/Actions/maintain.action';
import { Observable } from 'rxjs';
import { getButtonsState, getProgramsState } from '@shared/Ngrx/Selectors/maintain.selectors';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  openTableDialog: (dialog: Dialog) => unknown;

  openDetailDialog: (dialog: Dialog) => unknown;

  myGrid: Observable<Grid<Program, Button>>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.loadGrid();
  }

  loadGrid() {
    this.myGrid = new Observable(subscriber => {

      const grid: Grid<Program, Button> = {
        tableName: TableEnum.Programs,
        sort: { active: 'id', direction: 'asc' },
        columns: [
          {
            header: 'Id',
            columnDef: 'id',
            type: ColumnEnum.string,
            selector: ColumnEnum.label,
            visible: false
          },
          {
            header: 'Name',
            columnDef: 'name',
            type: ColumnEnum.string,
            selector: ColumnEnum.input
          },
          {
            header: 'Remark',
            columnDef: 'remark',
            type: ColumnEnum.string,
            selector: ColumnEnum.input
          },
          {
            header: 'LinkTag',
            columnDef: 'linkTag',
            type: ColumnEnum.string,
            selector: ColumnEnum.input
          },
        ],
        detail: (program) => {
          return new Observable(detailSubscriber => {

            const detail: Detail<Button> = {
              tableName: TableEnum.Buttons,
              sort: { active: 'id', direction: 'asc' },
              columns: [
                {
                  header: 'Id',
                  columnDef: 'id',
                  type: ColumnEnum.string,
                  selector: ColumnEnum.label,
                  visible: false,
                },
                {
                  header: 'Name',
                  columnDef: 'name',
                  type: ColumnEnum.string,
                  selector: ColumnEnum.input,
                },
                {
                  header: 'Remark',
                  columnDef: 'remark',
                  type: ColumnEnum.string,
                  selector: ColumnEnum.input,
                },
              ],
              read: () => {

                this.store.dispatch( new Read<Button>(
                  `${TableEnum.Programs}.${TableEnum.Buttons}`,
                    [],
                    { program: program.id } as Button
                  )
                );

                return this.store.select(getButtonsState);

              },
              create: () => {

                const dialog: DialogComponent = this.openDetailDialog({
                  title: '新增頁面',
                  button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
                  method: DialogEnum.create,
                  data: {} as Button,
                }) as DialogComponent;

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
              edit: (button) => {

                const dialog: DialogComponent = this.openDetailDialog({
                  title: '修改頁面',
                  button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
                  method: DialogEnum.edit,
                  data: button,
                }) as DialogComponent;

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
              delete: (button) => {

                const isCanDelete = confirm('Are you sure you want to delete this?');

                if (isCanDelete) {

                  this.store.dispatch(
                    new Delete<Button>(
                      TableEnum.Buttons,
                      [],
                      button
                    )
                  );

                }

              }
            };

            detailSubscriber.next(detail);

            detailSubscriber.complete();
          });
        },
        read: () => {

          this.store.dispatch( new Read<Program>(TableEnum.Programs) );

          return this.store.select(getProgramsState);

        },
        create: () => {

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
          }) as DialogComponent;

        },
        edit: (program) => {

          const dialog: DialogComponent = this.openTableDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data: program,
            confirm: (): void => {
              this.store.dispatch(
                new Edit<Program>(
                  TableEnum.Programs,
                  [],
                  dialog.getData() as Program
                )
              );
            },
          }) as DialogComponent;

        },
        delete: (program) => {

          const isCanDelete = confirm('Are you sure you want to delete this?');

          if (isCanDelete) {

            this.store.dispatch(
              new Delete<Program>(
                TableEnum.Programs,
                [],
                program
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
