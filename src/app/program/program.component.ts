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
      { columnDef: 'id', header: 'Id', cell: (element: Program) => `${ element.id }` },
      { columnDef: 'name', header: 'Name', cell: (element: Program) => `${ element.name }` },
      { columnDef: 'remark', header: 'Remark', cell: (element: Program) => `${ element.remark }` },
      { columnDef: 'auth', header: 'Auth', cell: (element: Program) => `${ element.auth }` },
    ],
    displayedColumns: ['maintain', 'id', 'name', 'remark', 'auth'],
    create: () => {
      const data = this.tableComponent.dialogComponent.getData() as Program;
      data.id = (this.ELEMENT_DATA.length + 1).toString();
      this.ELEMENT_DATA.push(data);
      this.myGrid.dataSource = new MatTableDataSource<Program>(this.ELEMENT_DATA);
      this.tableComponent.pageNation();
    },
    createDialog: () => {

      const userModel: Schema[] = [
        { column: 'id', type: 'string', value: '' },
        { column: 'name', type: 'string', value: '' },
        { column: 'remark', type: 'string', value: '' },
        { column: 'auth', type: 'string', value: '' }
      ];

      this.tableComponent.openDialog({
        title: '新增頁面',
        button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
        method: DialogEnum.create,
        model: userModel,
      });

     },
    edit: () => {
      const data = this.tableComponent.dialogComponent.getData() as Program;
      console.log(data);
      const newData = this.ELEMENT_DATA.filter(x => x.id !== data.id);
      this.ELEMENT_DATA = newData;
      console.log(this.ELEMENT_DATA);
      this.ELEMENT_DATA.push(data);
      console.log(this.ELEMENT_DATA);
      this.myGrid.dataSource = new MatTableDataSource<Program>(this.ELEMENT_DATA);
      this.tableComponent.pageNation();
    },
    editDialog: (event: any) => {

      const element = event.target as HTMLElement;

      const nextNode = element.closest('td').nextSibling as HTMLElement;

      const userData =  this.ELEMENT_DATA.filter(x => x.id === nextNode.innerHTML.trim());

      const userModel: Schema[] = [
        { column: 'id', type: 'string', value: userData[0].id },
        { column: 'name', type: 'string', value:  userData[0].name },
        { column: 'remark', type: 'string', value:  userData[0].remark },
        { column: 'auth', type: 'string', value:  userData[0].auth }
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
