import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialog } from '@shared/Model/dialog.model';
import { DialogComponent } from '@shared/Component/table/dialog/dialog.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { Role } from '@shared/Model/role.model';
import { Create, Edit, Delete} from '@shared/Ngrx/Actions/maintain.action';
import { Observable } from 'rxjs';
import { RoleService } from '@services/role/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  openTableDialog: (dialog: Dialog) => unknown;

  myGrid: Observable<Grid<Role>>;

  constructor(
    private store: Store,
    private roleService: RoleService){}

  ngOnInit() {

    this.loadGrid();
  }

  loadGrid() {

    this.myGrid = new Observable(subscriber => {

      const grid: Grid<Role> = {
        tableName: TableEnum.Roles,
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
          }
        ],
        read: (): Observable<unknown> => {

          return this.roleService.getAll();
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
            }
          }) as DialogComponent;
        },
        edit: (role): void => {

          const dialog: DialogComponent = this.openTableDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data: role,
            confirm: (): void => {

              this.store.dispatch(
                new Edit<Role>(
                  TableEnum.Roles,
                  [],
                  dialog.getData() as Role
                )
              );
            },
          }) as DialogComponent;
        },
        delete: (role): void => {

          const isCanDelete = confirm('Are you sure you want to delete this?');

          if (isCanDelete) {

            this.store.dispatch(
              new Delete<Role>(
                TableEnum.Roles,
                [],
                role
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
