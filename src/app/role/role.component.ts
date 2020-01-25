import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { Grid } from '@shared/Model/table.model';
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
      { columnDef: 'id', header: 'Id', type: 'string', cell: (element: Role) => `${ element.id }` },
      { columnDef: 'name', header: 'Name', type: 'string', cell: (element: Role) => `${ element.name }` },
      { columnDef: 'remark', header: 'Remark', type: 'string', cell: (element: Role) => `${ element.remark }` },
    ],
    create: () => {
      const data = this.tableComponent.dialogComponent.getData() as Role;
      data.id = (this.ELEMENT_DATA.length + 1).toString();
      this.ELEMENT_DATA.push(data);
      this.myGrid.dataSource = new MatTableDataSource<Role>(this.ELEMENT_DATA);
      this.tableComponent.pageNation();
    },
    createDialog: () => {
      this.tableComponent.openDialog({
        title: '新增頁面',
        button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
        method: DialogEnum.create,
        data: '',
      });
     },
    edit: () => {
      const data = this.tableComponent.dialogComponent.getData() as Role;
      const newData = this.ELEMENT_DATA.filter(x => x.id !== data.id);
      this.ELEMENT_DATA = newData;
      this.ELEMENT_DATA.push(data);
      this.myGrid.dataSource = new MatTableDataSource<Role>(this.ELEMENT_DATA);
      this.tableComponent.pageNation();
    },
    editDialog: (event: any) => {

      const element = event.target as HTMLElement;

      const nextNode = element.closest('td').nextSibling as HTMLElement;

      const userData =  this.ELEMENT_DATA.filter(x => x.id === nextNode.innerHTML.trim());

      this.tableComponent.openDialog({
        title: '修改頁面',
        button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
        method: DialogEnum.edit,
        data:   userData[0],
      });

    }
  };

  constructor() { }

  ngOnInit() { }

  initComponentHandler(component: TableComponent) {
    this.tableComponent = component;
  }

}
