import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialog } from '@shared/Model/dialog.model';
import { DialogComponent } from '@shared/Component/table/dialog/dialog.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { User } from '@shared/Model/user.model';
import { Role } from '@shared/Model/role.model';
import { RoleService } from '@services/role/role.service';
import { Read, Create, Edit, Delete} from '@shared/Ngrx/Actions/maintain.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  openTableDialog: (dialog: Dialog) => any;

  myGrid: Observable<Grid>;

  constructor(private store: Store<any>,
              private roleService: RoleService) { }

  ngOnInit() {

    this.roleService.getAll().subscribe((roles) => {
      this.loadGrid(roles);
    });

  }

  loadGrid(roles: Role[]) {

    this.myGrid = new Observable(subscriber => {

      const grid = {
        tableName: TableEnum.Users,
        sort: { active: 'id', direction: 'asc' },
        columns: [
          {
            header: 'Id',
            columnDef: 'id',
            type: ColumnEnum.string,
            selector: ColumnEnum.label,
            visible: false,
            cell: (userElement: User) => `${ userElement.id }`
          },
          {
            header: 'Name',
            columnDef: 'name',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (userElement: User) => `${ userElement.name }`
          },
          {
            header: 'Password',
            columnDef: 'password',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (userElement: User) => `${ userElement.password }`
          },
          {
            header: 'Role',
            columnDef: 'role',
            type: ColumnEnum.string,
            selector: ColumnEnum.select,
            source: (): Observable<any> => {

              this.store.dispatch( new Read<Role>(TableEnum.Roles) );

              return this.store.select(TableEnum.Roles);
            },
            cell: (userElement: User) => `${
              userElement.role === '' ? '' :
              roles.filter(x => x.id ===  userElement.role)[0].name
            }`
          },
        ],
        read: (): Observable<any> => {

          this.store.dispatch( new Read<User>(TableEnum.Users) );

          return this.store.select(TableEnum.Users);

        },
        create: (): void => {

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

            },
          });

        },
        edit: (userElement: User): void => {

          const dialog: DialogComponent = this.openTableDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data: userElement,
            confirm: (): void => {

              this.store.dispatch(
                new Edit<User>(
                  TableEnum.Users,
                  [],
                  dialog.getData() as User
                )
              );

            },
          });

        },
        delete: (userElement: User): void => {

          const isCanDelete = confirm('Are you sure you want to delete this?');

          if (isCanDelete) {

            this.store.dispatch(
              new Delete<User>(
                TableEnum.Users,
                [],
                userElement
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
