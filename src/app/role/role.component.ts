import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { Grid } from '@shared/Model/table.model';
import { Schema } from '@shared/Model/table.model';
import { Role } from '@shared/Model/role.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  tableComponent: TableComponent;

  ELEMENT_DATA: Role[] = [
    { id: '1', name: 'ADMIN', remark: '管理員' },
    { id: '2', name: 'USER', remark: '一般使用者' }
  ];

  myGrid: Grid = {
    dataSource: new MatTableDataSource<Role>(this.ELEMENT_DATA),
    sort: { active: 'id', direction: 'asc' },
    columns: [
      { columnDef: 'id', header: 'Id', cell: (element: Role) => `${ element.id }` },
      { columnDef: 'name', header: 'Name', cell: (element: Role) => `${ element.name }` },
      { columnDef: 'remark', header: 'Remark', cell: (element: Role) => `${ element.remark }` },
    ],
    displayedColumns: ['maintain', 'id', 'name', 'remark'],
    create: () => {
      const data = this.tableComponent.dialogComponent.getData() as Role;
      data.id = (this.ELEMENT_DATA.length + 1).toString();
      this.ELEMENT_DATA.push(data);
      this.myGrid.dataSource = new MatTableDataSource<Role>(this.ELEMENT_DATA);
      this.tableComponent.pageNation();
    },
    createDialog: () => {

      const userModel: Schema[] = [
        { column: 'id', type: 'string', value: '' },
        { column: 'name', type: 'string', value: '' },
        { column: 'remark', type: 'string', value: '' }
      ];

      this.tableComponent.openDialog({
        title: '新增頁面',
        button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
        method: DialogEnum.create,
        model: userModel,
      });

     },
    edit: () => {
      const data = this.tableComponent.dialogComponent.getData() as Role;
      console.log(data);
      const newData = this.ELEMENT_DATA.filter(x => x.id !== data.id);
      this.ELEMENT_DATA = newData;
      console.log(this.ELEMENT_DATA);
      this.ELEMENT_DATA.push(data);
      console.log(this.ELEMENT_DATA);
      this.myGrid.dataSource = new MatTableDataSource<Role>(this.ELEMENT_DATA);
      this.tableComponent.pageNation();
    },
    editDialog: (event: any) => {

      const element = event.target as HTMLElement;

      const nextNode = element.closest('td').nextSibling as HTMLElement;

      const userData =  this.ELEMENT_DATA.filter(x => x.id === nextNode.innerHTML.trim());

      const userModel: Schema[] = [
        { column: 'id', type: 'string', value: userData[0].id },
        { column: 'name', type: 'string', value:  userData[0].name },
        { column: 'remark', type: 'string', value:  userData[0].remark }
      ];

      this.tableComponent.openDialog({
        title: '修改頁面',
        button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
        method: DialogEnum.edit,
        model:  userModel,
      });

    }
  };

  constructor() { }

  ngOnInit() { }

  initComponentHandler(component: TableComponent) {
    this.tableComponent = component;
    console.log(component);
  }

}
