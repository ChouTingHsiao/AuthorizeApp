import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { Grid } from '@shared/Model/table.model';
import { Schema } from '@shared/Model/table.model';
import { Group } from '@shared/Model/group.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  tableComponent: TableComponent;

  ELEMENT_DATA: Group[] = [
    { id: '1', name: 'ADMIN', remark: '管理員群組' }
  ];

  myGrid: Grid = {
    dataSource: new MatTableDataSource<Group>(this.ELEMENT_DATA),
    sort: { active: 'id', direction: 'asc' },
    columns: [
      { columnDef: 'id', header: 'Id', type: 'string', cell: (element: Group) => `${ element.id }` },
      { columnDef: 'name', header: 'Name', type: 'string', cell: (element: Group) => `${ element.name }` },
      { columnDef: 'remark', header: 'Remark', type: 'string', cell: (element: Group) => `${ element.remark }` },
    ],
    create: () => {
      const data = this.tableComponent.dialogComponent.getData() as Group;
      data.id = (this.ELEMENT_DATA.length + 1).toString();
      this.ELEMENT_DATA.push(data);
      this.myGrid.dataSource = new MatTableDataSource<Group>(this.ELEMENT_DATA);
      this.tableComponent.pageNation();
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
      const data = this.tableComponent.dialogComponent.getData() as Group;
      const newData = this.ELEMENT_DATA.filter(x => x.id !== data.id);
      this.ELEMENT_DATA = newData;
      this.ELEMENT_DATA.push(data);
      this.myGrid.dataSource = new MatTableDataSource<Group>(this.ELEMENT_DATA);
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
