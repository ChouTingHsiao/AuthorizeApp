import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { Role } from '@shared/Model/role.model';
import { Group } from '@shared/Model/group.model';
import { RoleService } from '@services/role/role.service';
import { GroupsCreate, GroupsRead, GroupsEdit, GroupsDelete} from '@shared/ngrx/Actions/group.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  tableComponent: TableComponent;

  myGrid: Observable<Grid>;

  constructor(private store: Store<any>,
              private roleService: RoleService) { }

  ngOnInit() {

    this.roleService.getAll().subscribe((roles) => {
      this.loadGrid(roles);
      this.store.dispatch( new GroupsRead<Group>(TableEnum.Groups) );
    });

  }

  loadGrid(roles: Role[]) {

    this.myGrid = new Observable(subscriber => {

      const grid = {
        tableName: TableEnum.Groups,
        sort: { active: 'id', direction: 'asc' },
        columns: [
          {
            header: 'Id',
            columnDef: 'id',
            type: ColumnEnum.string,
            selector: ColumnEnum.label,
            visible: false,
            cell: (element: Group) => `${ element.id }`
          },
          {
            header: 'Name',
            columnDef: 'name',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (element: Group) => `${ element.name }`
          },
          {
            header: 'Role',
            columnDef: 'role',
            type: ColumnEnum.string,
            selector: ColumnEnum.multiselect,
            source:  roles as [],
            cell: (element: Group) => `${
              element.role.map(x => {
                const role = roles.filter(y => y.id === x)[0];
                return  role ? role.name : '';
              }).join(',')
            }`
          },
        ],
        read: (): Observable<any> => {

          return this.store.select(TableEnum.Groups);

        },
        create: (): void => {

            this.tableComponent.openDialog({
              title: '新增頁面',
              button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
              method: DialogEnum.create,
              confirm: () => {
                this.store.dispatch( new GroupsCreate<Group>(
                  TableEnum.Groups,
                  [],
                  this.tableComponent.dialogComponent.getData() as Group)
                );
              }
            });

        },
        edit: (event: any): void => {

          this.myGrid.subscribe(x => {

            const element = event.target as HTMLElement;

            const nextNode = element.closest('td').nextSibling as HTMLElement;

            const data =  this.tableComponent.dataSource.data.filter(y => y.id === nextNode.innerHTML.trim());

            this.tableComponent.openDialog({
              title: '修改頁面',
              button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
              method: DialogEnum.edit,
              data:  data[0],
              confirm: () => {
                this.store.dispatch( new GroupsEdit<Group>(
                  TableEnum.Groups,
                  [],
                  this.tableComponent.dialogComponent.getData() as Group)
                );
              }
            });

          });

        },
        delete: (event: any): void => {

          const element = event.target as HTMLElement;

          const nextNode = element.closest('td').nextSibling as HTMLElement;

          this.store.dispatch( new GroupsDelete<Group>(
            TableEnum.Groups,
            [],
            {id: nextNode.innerHTML.trim()} as Group)
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
