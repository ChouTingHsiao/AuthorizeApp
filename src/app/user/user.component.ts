import { Component, OnInit, ViewChild, AfterViewInit, Output, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Schema } from '../shared/Model/table.model';
import {Dialog} from '../shared/Model/dialog.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

  SCHEMA: Schema[] = [
    {column: 'name', type: 'string', value: ''},
    {column: 'password', type: 'string', value: ''}
  ];

  displayedColumns: string[] = ['maintain', 'name', 'password'];

  ELEMENT_DATA: PeriodicElement[] = [
    {id: '1', name: 'ADMIN', password: 'ADMIN'},
    {id: '2', name: 'USER', password: 'USER'}
  ];

  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  create() {

    this.openDialog({
      title: '新增頁面',
      button: ['新增', '取消'],
      template: '<p>test</p>'
    });

    // this.ELEMENT_DATA.push({name: 'TEST', password: 'TEST'});
    this.dataSource.paginator = this.paginator;
  }

  edit(event: any) {
    const element = event.target as HTMLElement;
    const next = element.closest('td').nextSibling as HTMLElement;

    console.log(next.innerHTML);
    this.openDialog({
      title: '修改頁面',
      button: ['修改', '取消'],
      template: '<p>test</p>'
    });


  }

  openDialog(DialogData: Dialog) {
    const dialogRef = this.dialog.open(DialogComponent);
    const instance = dialogRef.componentInstance;
    instance.SchemaArray = this.SCHEMA;
    instance.DialogData = DialogData;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

export interface PeriodicElement {
  id: string;
  name: string;
  password: string;
}
