import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { Program } from '@shared/Model/program.model';
import { Menu } from '@shared/Model/menu.model';
import { ProgramService } from '@services/program/program.service';
import { MenusCreate, MenusRead, MenusEdit, MenusDelete} from '@shared/ngrx/Actions/menu.action';
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
      this.store.dispatch( new MenusRead<Menu>(TableEnum.Menus) );
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
            source: programs as [],
            cell: (element: Menu) => `${
              element.program === '' ? '' :
              programs.filter(x => x.id ===  element.program)[0].name
            }`
          },
        ],
        read: (): Observable<any> => {

          return this.store.select(TableEnum.Menus);

        },
        create: (): void => {

            this.tableComponent.openDialog({
              title: '新增頁面',
              button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
              method: DialogEnum.create,
              confirm: () => {
                this.store.dispatch( new MenusCreate<Menu>(
                  TableEnum.Menus,
                  [],
                  this.tableComponent.dialogComponent.getData() as Menu)
                );
              }
            });

        },
        edit: (event: any): void => {

          const element = event.target as HTMLElement;

          const nextNode = element.closest('td').nextSibling as HTMLElement;

          const data = this.tableComponent.dataSource.data.filter(y => y.id === nextNode.innerHTML.trim());

          this.tableComponent.openDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data:  data[0],
            confirm: () => {
              this.store.dispatch( new MenusEdit<Menu>(
                TableEnum.Menus,
                [],
                this.tableComponent.dialogComponent.getData() as Menu)
              );
            }
          });

        },
        delete: (event: any): void => {

          const element = event.target as HTMLElement;

          const nextNode = element.closest('td').nextSibling as HTMLElement;

          this.store.dispatch( new MenusDelete<Menu>(
            TableEnum.Menus,
            [],
            {id: nextNode.innerHTML.trim()} as Menu)
          );

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
