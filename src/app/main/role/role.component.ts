import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { Role } from '@shared/Model/role.model';
import { Read, Create, Edit, Delete} from '@shared/ngrx/Actions/maintain.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  tableComponent: TableComponent;

  myGrid: Observable<Grid>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.loadGrid();
    this.store.dispatch( new Read<Role>(TableEnum.Roles) );
  }

  loadGrid() {

    this.myGrid = new Observable(subscriber => {

      const grid = {
        tableName: TableEnum.Roles,
        sort: { active: 'id', direction: 'asc' },
        columns: [
          {
            header: 'Id',
            columnDef: 'id',
            type: ColumnEnum.string,
            selector: ColumnEnum.label,
            visible: false,
            cell: (element: Role) => `${ element.id }`
          },
          {
            header: 'Name',
            columnDef: 'name',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (element: Role) => `${ element.name }`
          },
          {
            header: 'Remark',
            columnDef: 'remark',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (element: Role) => `${ element.remark }`
          },
        ],
        read: (): Observable<any> => {

          return this.store.select(TableEnum.Roles);

        },
        create: (): void => {

          this.tableComponent.openDialog({
            title: '新增頁面',
            button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
            method: DialogEnum.create,
            confirm: () => {
              this.store.dispatch( new Create<Role>(
                TableEnum.Roles,
                [],
                this.tableComponent.dialogComponent.getData() as Role )
              );
            }
          });

        },
        edit: (event: any): void => {

          const element = event.target as HTMLElement;

          const nextNode = element.closest('td').nextSibling as HTMLElement;

          const data =  this.tableComponent.dataSource.data.filter(y => y.id === nextNode.innerHTML.trim());

          this.tableComponent.openDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data:  data[0],
            confirm: () => {
              this.store.dispatch( new Edit<Role>(
                TableEnum.Roles,
                [],
                this.tableComponent.dialogComponent.getData() as Role )
              );
            }
          });

        },
        delete: (event: any): void => {

          const element = event.target as HTMLElement;

          const nextNode = element.closest('td').nextSibling as HTMLElement;

          this.store.dispatch( new Delete<Role>(
            TableEnum.Roles,
            [],
            {id: nextNode.innerHTML.trim()} as Role )
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
