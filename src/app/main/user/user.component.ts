import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { User } from '@shared/Model/user.model';
import { Role } from '@shared/Model/role.model';
import { RoleService } from '@services/role/role.service';
import { Read, Create, Edit, Delete} from '@shared/ngrx/Actions/maintain.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  tableComponent: TableComponent;

  myGrid: Observable<Grid>;

  constructor(private store: Store<any>,
              private roleService: RoleService) { }

  ngOnInit() {

    this.roleService.getAll().subscribe((roles) => {
      this.loadGrid(roles);
      this.store.dispatch( new Read<User>(TableEnum.Users) );
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
            cell: (element: User) => `${ element.id }`
          },
          {
            header: 'Name',
            columnDef: 'name',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (element: User) => `${ element.name }`
          },
          {
            header: 'Password',
            columnDef: 'password',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (element: User) => `${ element.password }`
          },
          {
            header: 'Role',
            columnDef: 'role',
            type: ColumnEnum.string,
            selector: ColumnEnum.select,
            source: roles as [],
            cell: (element: User) => `${
              element.role === '' ? '' :
              roles.filter(x => x.id ===  element.role)[0].name
            }`
          },
        ],
        read: (): Observable<any> => {

          return this.store.select(TableEnum.Users);

        },
        create: (): void => {

          this.tableComponent.openDialog({
            title: '新增頁面',
            button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
            method: DialogEnum.create,
            confirm: () => {
              this.store.dispatch( new Create<User>(
                TableEnum.Users,
                [],
                this.tableComponent.dialogComponent.getData() as User )
              );
            }
          });

        },
        edit: (event: any): void => {

          const element = event.target as HTMLElement;

          const nextNode = element.closest('td').nextSibling as HTMLElement;

          const userData =  this.tableComponent.dataSource.data.filter(y => y.id === nextNode.innerHTML.trim());

          this.tableComponent.openDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data:  userData[0],
            confirm: () => {
              this.store.dispatch( new Edit<User>(
                TableEnum.Users,
                [],
                this.tableComponent.dialogComponent.getData() as User )
              );
            }
          });

        },
        delete: (event: any): void => {

          const element = event.target as HTMLElement;

          const nextNode = element.closest('td').nextSibling as HTMLElement;

          this.store.dispatch( new Delete<User>(
            TableEnum.Users,
            [],
            {id: nextNode.innerHTML.trim()} as User )
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
