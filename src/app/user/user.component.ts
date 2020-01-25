import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Grid} from '@shared/Model/table.model';
import {TableComponent} from '@shared/Component/table.component';
import {DialogEnum} from '@shared/Enum/dialog.enum';
import {Schema} from '@shared/Model/table.model';
import {User} from '@shared/Model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  tableComponent: TableComponent;

  ELEMENT_DATA: User[] = [
    {id: '1', name: 'ADMIN', password: 'ADMIN'},
    {id: '2', name: 'USER', password: 'USER'}
  ];

  myGrid: Grid = {
    dataSource: new MatTableDataSource<User>(this.ELEMENT_DATA),
    sort: {active: 'id', direction: 'asc'},
    columns: [
      { columnDef: 'id', header: 'Id', cell: (element: any) => `${element.id}` },
      { columnDef: 'name', header: 'Name', cell: (element: any) => `${element.name}` },
      { columnDef: 'password', header: 'Password', cell: (element: any) => `${element.password}` },
    ],
    displayedColumns: ['maintain', 'id', 'name', 'password'],
    create: () => {
      const data = this.tableComponent.dialogComponent.getData() as User;
      data.id = (this.ELEMENT_DATA.length + 1).toString();
      this.ELEMENT_DATA.push(data);
      this.myGrid.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      this.tableComponent.pageNation();
    },
    createDialog: () => {

      const userModel: Schema[] = [
        {column: 'id', type: 'string', value: ''},
        {column: 'name', type: 'string', value: ''},
        {column: 'password', type: 'string', value: ''}
      ];

      this.tableComponent.openDialog({
        title: '新增頁面',
        button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
        method: DialogEnum.create,
        model: userModel,
      });

    },
    edit: () => {
      const data = this.tableComponent.dialogComponent.getData() as User;
      console.log(data);
      const newData = this.ELEMENT_DATA.filter(x => x.id !== data.id);
      this.ELEMENT_DATA = newData;
      console.log(this.ELEMENT_DATA);
      this.ELEMENT_DATA.push(data);
      console.log(this.ELEMENT_DATA);
      this.myGrid.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      this.tableComponent.pageNation();
    },
    editDialog: (event: any) => {

      const element = event.target as HTMLElement;

      const nextNode = element.closest('td').nextSibling as HTMLElement;

      const userData =  this.ELEMENT_DATA.filter(x => x.id === nextNode.innerHTML.trim());

      const userModel: Schema[] = [
        {column: 'id', type: 'string', value: userData[0].id},
        {column: 'name', type: 'string', value:  userData[0].name},
        {column: 'password', type: 'string', value:  userData[0].password}
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

  ngOnInit() {}

  initComponentHandler(component: TableComponent) {
    this.tableComponent = component;
    console.log(component);
  }

}
