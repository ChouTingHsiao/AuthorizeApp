import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { Role } from '@shared/Model/role.model';
import { RoleService } from '@services/role/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  tableComponent: TableComponent;

  ELEMENT_DATA: Role[] = this.roleService.getAll();

  myGrid: Grid = {
    tableName: TableEnum.Roles,
    dataSource: new MatTableDataSource<Role>(this.ELEMENT_DATA),
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
    create: () => {
      this.store.dispatch({
        type: `${TableEnum.Roles}.${DialogEnum.create}`,
        payload: {
          name: TableEnum.Roles,
          source: this.myGrid.dataSource.data,
          newData: this.tableComponent.dialogComponent.getData() as Role
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
        type: `${TableEnum.Roles}.${DialogEnum.edit}`,
        payload: {
          name: TableEnum.Roles,
          source: this.myGrid.dataSource.data,
          newData: this.tableComponent.dialogComponent.getData() as Role
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

  constructor(private store: Store<any>,
              private roleService: RoleService) { }

  ngOnInit() {
    this.store.dispatch({
      type: `${TableEnum.Roles}.${DialogEnum.read}`,
      payload: {
        source: this.myGrid.dataSource.data
      }
    });
  }

  initComponentHandler(component: TableComponent) {
    this.tableComponent = component;
  }

}
