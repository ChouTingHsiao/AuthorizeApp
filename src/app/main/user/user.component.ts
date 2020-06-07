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
import { UsersCreate, UsersRead, UsersEdit, UsersDelete} from '@shared/ngrx/Actions/user.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  tableComponent: TableComponent;

  myGrid: Grid;

  Users: User[];

  Roles: Role[];

  constructor(private store: Store<any>,
              private roleService: RoleService) { }

  ngOnInit() {
    this.roleService.getAll().subscribe((roles) => this.Roles = roles);
    this.loadGrid();
    this.store.dispatch( new UsersRead<User>(TableEnum.Users) );
  }

  loadGrid() {
    this.myGrid = {
      tableName: TableEnum.Users,
      dataSource: this.store.select(TableEnum.Users),
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
          source: this.Roles as [],
          cell: (element: User) => `${
            element.role === '' ? '' :
            this.Roles.filter(x => x.id ===  element.role)[0].name
          }`
        },
      ],
      create: () => {
        this.store.dispatch( new UsersCreate<User>(
          TableEnum.Users,
          [],
          this.tableComponent.dialogComponent.getData() as User )
        );
      },
      createDialog: () => {
        this.tableComponent.openDialog({
          title: '新增頁面',
          button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
          method: DialogEnum.create,
          data:  '',
        });
      },
      edit: () => {
        this.store.dispatch( new UsersEdit<User>(
          TableEnum.Users,
          [],
          this.tableComponent.dialogComponent.getData() as User )
        );
      },
      editDialog: (event: any) => {

        const element = event.target as HTMLElement;

        const nextNode = element.closest('td').nextSibling as HTMLElement;

        const userData =  this.myGrid.dataSource.data.filter(x => x.id === nextNode.innerHTML.trim());

        this.tableComponent.openDialog({
          title: '修改頁面',
          button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
          method: DialogEnum.edit,
          data:  userData[0],
        });

      },
      delete: (event: any) => {

        const element = event.target as HTMLElement;

        const nextNode = element.closest('td').nextSibling as HTMLElement;

        this.store.dispatch( new UsersDelete<User>(
          TableEnum.Users,
          [],
          {id: nextNode.innerHTML.trim()} as User )
        );
      },
    };
  }

  initComponentHandler(component: TableComponent) {
    this.tableComponent = component;
  }

}
