import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { Role } from '@shared/Model/role.model';
import { Group } from '@shared/Model/group.model';
import { GroupService } from '@services/group/group.service';
import { RoleService } from '@services/role/role.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  tableComponent: TableComponent;

  myGrid: Grid;

  Groups: Group[];

  Roles: Role[];

  constructor(private store: Store<any>,
              private groupService: GroupService,
              private roleService: RoleService) { }

  ngOnInit() {
    this.groupService.getAll().subscribe((groups) => this.Groups = groups);
    this.roleService.getAll().subscribe((roles) => this.Roles = roles);
    this.loadGrid();
    this.store.dispatch({ type: `${TableEnum.Groups}.${DialogEnum.read}` });
  }

  loadGrid() {
    this.myGrid = {
      tableName: TableEnum.Groups,
      dataSource: new MatTableDataSource<Group>(this.Groups),
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
          source:  this.Roles as [],
          cell: (element: Group) => `${
            element.role.map(x => {
              const role = this.Roles.filter(y => y.id === x)[0];
              return  role ? role.name : '';
            }).join(',')
          }`
        },
      ],
      create: () => {
        this.store.dispatch({
          type: `${TableEnum.Groups}.${DialogEnum.create}`,
          payload: {
            newData: this.tableComponent.dialogComponent.getData() as Group
          }
        });
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
        this.store.dispatch({
          type: `${TableEnum.Groups}.${DialogEnum.edit}`,
          payload: {
            newData: this.tableComponent.dialogComponent.getData() as Group
          }
        });
      },
      editDialog: (event: any) => {

        const element = event.target as HTMLElement;

        const nextNode = element.closest('td').nextSibling as HTMLElement;

        const data =  this.myGrid.dataSource.data.filter(x => x.id === nextNode.innerHTML.trim());

        this.tableComponent.openDialog({
          title: '修改頁面',
          button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
          method: DialogEnum.edit,
          data:  data[0],
        });

      }
    };
  }

  initComponentHandler(component: TableComponent) {
    this.tableComponent = component;
  }

}
