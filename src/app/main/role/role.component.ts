import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableComponent } from '@shared/Component/table/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { Role } from '@shared/Model/role.model';
import { Read, Create, Edit, Delete} from '@shared/Ngrx/Actions/maintain.action';
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

          this.store.dispatch( new Read<Role>(TableEnum.Roles) );

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
        edit: (element: Role): void => {

          this.tableComponent.openDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data: element,
            confirm: () => {
              this.store.dispatch(
                new Edit<Role>(
                  TableEnum.Roles,
                  [],
                  this.tableComponent.dialogComponent.getData() as Role
                )
              );
            }
          });

        },
        delete: (element: Role): void => {

          const isCanDelete = confirm('Are you sure you want to delete this?');

          if (isCanDelete) {

            this.store.dispatch(
              new Delete<Role>(
                TableEnum.Roles,
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
