import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialog } from '@shared/Model/dialog.model';
import { DialogComponent } from '@shared/Component/table/dialog/dialog.component';
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

  openTableDialog: (dialog: Dialog) => any;

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

          const dialog: DialogComponent = this.openTableDialog({
            title: '新增頁面',
            button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
            method: DialogEnum.create,
            data: {} as Role,
            confirm: (): void => {

              this.store.dispatch(
                new Create<Role>(
                  TableEnum.Roles,
                  [],
                  dialog.getData() as Role
                )
              );

            },
          });

        },
        edit: (element: Role): void => {

          const dialog: DialogComponent = this.openTableDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data: element,
            confirm: (): void => {

              this.store.dispatch(
                new Edit<Role>(
                  TableEnum.Roles,
                  [],
                  dialog.getData() as Role
                )
              );

            },
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
