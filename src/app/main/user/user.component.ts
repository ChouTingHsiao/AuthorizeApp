import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialog } from '@shared/Model/dialog.model';
import { DialogComponent } from '@shared/Component/table/dialog/dialog.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { User } from '@shared/Model/user.model';
import { Create, Edit, Delete} from '@shared/Ngrx/Actions/maintain.action';
import { Observable } from 'rxjs';
import { UserService } from '@services/user/user.service';
import { RoleService } from '@services/role/role.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  openTableDialog: (dialog: Dialog) => unknown;

  myGrid: Observable<Grid<User>>;

  constructor(
    private store: Store,
    private userService: UserService,
    private roleService: RoleService){}

  ngOnInit() {

    this.loadGrid();
  }

  loadGrid() {

    this.myGrid = new Observable(subscriber => {

      const grid: Grid<User> = {
        tableName: TableEnum.Users,
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
            header: 'Password',
            columnDef: 'password',
            type: ColumnEnum.string,
            selector: ColumnEnum.input
          },
          {
            header: 'Role',
            columnDef: 'role',
            displayName: 'roleName',
            type: ColumnEnum.string,
            selector: ColumnEnum.select,
            source: (): Observable<unknown> => {

              return this.roleService.getAll();
            }
          }
        ],
        read: () => {
          
          return this.userService.getAll();
        },
        create: () => {

          const dialog: DialogComponent = this.openTableDialog({
            title: '新增頁面',
            button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
            method: DialogEnum.create,
            data: {} as User,
            confirm: (): void => {

              this.store.dispatch(
                new Create<User>(
                  TableEnum.Users,
                  [],
                  dialog.getData() as User
                )
              );
            }
          }) as DialogComponent;
        },
        edit: (user) => {

          const dialog: DialogComponent = this.openTableDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data: user,
            confirm: (): void => {

              this.store.dispatch(
                new Edit<User>(
                  TableEnum.Users,
                  [],
                  dialog.getData() as User
                )
              );
            }
          }) as DialogComponent;
        },
        delete: (user) => {

          const isCanDelete = confirm('Are you sure you want to delete this?');

          if (isCanDelete) {

            this.store.dispatch(
              new Delete<User>(
                TableEnum.Users,
                [],
                user
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
