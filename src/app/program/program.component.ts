import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { Grid } from '@shared/Model/table.model';
import { Schema } from '@shared/Model/table.model';
import { Program } from '@shared/Model/program.model';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  tableComponent: TableComponent;

  ELEMENT_DATA: Program[] = [
    { id: '1', name: 'User', remark: '使用者', auth: '' },
    { id: '2', name: 'Role', remark: '角色', auth: 'ADMIN' },
    { id: '3', name: 'Group', remark: '群組', auth: 'ADMIN' },
    { id: '4', name: 'Program', remark: '程式', auth: 'ADMIN' },
  ];

  myGrid: Grid = {
    dataSource: new MatTableDataSource<Program>(this.ELEMENT_DATA),
    sort: { active: 'id', direction: 'asc' },
    columns: [
      { columnDef: 'id', header: 'Id', type: 'string', cell: (element: Program) => `${ element.id }` },
      { columnDef: 'name', header: 'Name', type: 'string', cell: (element: Program) => `${ element.name }` },
      { columnDef: 'remark', header: 'Remark', type: 'string', cell: (element: Program) => `${ element.remark }` },
      { columnDef: 'auth', header: 'Auth', type: 'string', cell: (element: Program) => `${ element.auth }` },
    ],
    create: () => {
      const data = this.tableComponent.dialogComponent.getData() as Program;
      data.id = (this.ELEMENT_DATA.length + 1).toString();
      this.ELEMENT_DATA.push(data);
      this.myGrid.dataSource = new MatTableDataSource<Program>(this.ELEMENT_DATA);
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
      const data = this.tableComponent.dialogComponent.getData() as Program;
      const newData = this.ELEMENT_DATA.filter(x => x.id !== data.id);
      this.ELEMENT_DATA = newData;
      this.ELEMENT_DATA.push(data);
      this.myGrid.dataSource = new MatTableDataSource<Program>(this.ELEMENT_DATA);
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
