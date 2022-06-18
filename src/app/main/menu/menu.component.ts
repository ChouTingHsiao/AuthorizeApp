import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialog } from '@shared/Model/dialog.model';
import { DialogComponent } from '@shared/Component/table/dialog/dialog.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { Program } from '@shared/Model/program.model';
import { Menu } from '@shared/Model/menu.model';
import { Read, Create, Edit, Delete} from '@shared/Ngrx/Actions/maintain.action';
import { Observable } from 'rxjs';
import { Button } from '@shared/Model/button.model';
import { getProgramsState, getMenusState } from '@shared/Ngrx/Selectors/maintain.selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  openTableDialog: (dialog: Dialog) => unknown;

  myGrid: Observable<Grid<Menu>>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.loadGrid();
  }

  loadGrid() {
    this.myGrid = new Observable(subscriber => {

      const grid: Grid<Menu> = {
        tableName: TableEnum.Menus,
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
            header: 'Program',
            columnDef: 'program',
            displayName: 'programName',
            type: ColumnEnum.string,
            selector: ColumnEnum.select,
            source: (): Observable<unknown> => {

              this.store.dispatch( new Read<Program>(TableEnum.Programs) );

              return this.store.select(getProgramsState);
            }
          }
        ],
        read: () => {

          return this.store.select(getMenusState);

        },
        create: () => {

          const dialog: DialogComponent = this.openTableDialog({
            title: '新增頁面',
            button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
            method: DialogEnum.create,
            data: {} as Menu,
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
                new Create<Menu>(
                  TableEnum.Menus,
                  [],
                  dialog.getData() as Menu
                )
              );

            }
          }) as DialogComponent;

        },
        edit: (menu) => {

          this.store.dispatch( new Read<Button>(
            `${TableEnum.Programs}.${TableEnum.Buttons}`,
              [],
              { program: menu.program } as Button
            )
          );

          const dialog: DialogComponent = this.openTableDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data: menu,
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
                new Edit<Menu>(
                  TableEnum.Menus,
                  [],
                  dialog.getData() as Menu
                )
              );

            },
          }) as DialogComponent;

        },
        delete: (menu) => {

          const isCanDelete = confirm('Are you sure you want to delete this?');

          if (isCanDelete) {

            this.store.dispatch(
              new Delete<Menu>(
                TableEnum.Menus,
                [],
                menu
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
