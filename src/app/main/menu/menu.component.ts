import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableComponent } from '@shared/Component/table/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { Program } from '@shared/Model/program.model';
import { Menu } from '@shared/Model/menu.model';
import { ProgramService } from '@services/program/program.service';
import { Read, Create, Edit, Delete} from '@shared/ngrx/Actions/maintain.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  tableComponent: TableComponent;

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
            cell: (element: Menu) => `${
              element.program === '' ? '' :
              programs.filter(x => x.id ===  element.program)[0].name
            }`
          },
        ],
        read: (): Observable<any> => {

          this.store.dispatch( new Read<Menu>(TableEnum.Menus) );

          return this.store.select(TableEnum.Menus);

        },
        create: (): void => {

            this.tableComponent.openDialog({
              title: '新增頁面',
              button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
              method: DialogEnum.create,
              confirm: () => {
                this.store.dispatch( new Create<Menu>(
                  TableEnum.Menus,
                  [],
                  this.tableComponent.dialogComponent.getData() as Menu)
                );
              }
            });

        },
        edit: (element: Menu): void => {

          this.tableComponent.openDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data: element,
            confirm: () => {
              this.store.dispatch(
                new Edit<Menu>(
                  TableEnum.Menus,
                  [],
                  this.tableComponent.dialogComponent.getData() as Menu
                )
              );
            }
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

  initComponentHandler(component: TableComponent) {

    this.tableComponent = component;

  }

}
