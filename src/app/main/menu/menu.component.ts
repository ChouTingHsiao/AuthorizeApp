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
import { ProgramService } from '@services/program/program.service';
import { Read, Create, Edit, Delete} from '@shared/Ngrx/Actions/maintain.action';
import { Observable } from 'rxjs';
import { Button } from '@shared/Model/button.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  openTableDialog: (dialog: Dialog) => DialogComponent;

  myGrid: Observable<Grid>;

  constructor(private store: Store<any>,
              private programService: ProgramService) { }

  ngOnInit() {

    this.programService.getAll().subscribe((programs) => {
      this.loadGrid(programs);
    });

  }

  loadGrid(programs: Program[]) {

    this.myGrid = new Observable(subscriber => {

      const grid = {
        tableName: TableEnum.Menus,
        sort: { active: 'id', direction: 'asc' },
        columns: [
          {
            header: 'Id',
            columnDef: 'id',
            type: ColumnEnum.string,
            selector: ColumnEnum.label,
            visible: false,
            cell: (element: Menu) => `${ element.id }`
          },
          {
            header: 'Name',
            columnDef: 'name',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (element: Menu) => `${ element.name }`
          },
          {
            header: 'Program',
            columnDef: 'program',
            type: ColumnEnum.string,
            selector: ColumnEnum.select,
            source: (): Observable<any> => {

              this.store.dispatch( new Read<Program>(TableEnum.Programs) );

              return this.store.select(TableEnum.Programs);
            },
            cell: (element: Menu): string => {

                let authProgramName = '';

                const authProgram = programs.filter(x => x.id ===  element.program);

                const isNotAuthEmpty = element.program !== '';

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

              this.store.dispatch( new Read<Button>(TableEnum.Buttons) );

              return this.store.select(TableEnum.Buttons);

            },
            cell: (element: Menu) => {

              const programButtons = programs.filter(x => x.id === element.program);

              if (programButtons.length > 0 &&
                  programButtons[0].buttons &&
                  programButtons[0].buttons.length > 0) {

                return `${
                  element.buttons.map(x => {

                    const button = programButtons[0].buttons.filter(y => y.id === x);

                    return  button === undefined ? '' :  button[0].name;

                  }).join(',')
                }`;

              }

              return '';

            }
          },
        ],
        read: (): Observable<any> => {

          return this.store.select(TableEnum.Menus);

        },
        create: (): void => {

          const dialog: DialogComponent = this.openTableDialog({
            title: '新增頁面',
            button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
            method: DialogEnum.create,
            data: {} as Menu,
            onChanges: (event) => {
              console.log(event);
              dialog.ComponentDictionary.buttons.source = this.store.select(TableEnum.Buttons);
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
          });

        },
        edit: (element: Menu): void => {

          const dialog: DialogComponent = this.openTableDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data: element,
            confirm: (): void => {

              this.store.dispatch(
                new Edit<Menu>(
                  TableEnum.Menus,
                  [],
                  dialog.getData() as Menu
                )
              );

            },
          });

        },
        delete: (element: Menu): void => {

          const isCanDelete = confirm('Are you sure you want to delete this?');

          if (isCanDelete) {

            this.store.dispatch(
              new Delete<Menu>(
                TableEnum.Menus,
                [],
                element
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
