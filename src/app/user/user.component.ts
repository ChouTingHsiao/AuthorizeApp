import { Component, OnInit, ViewChild, AfterViewInit, Output, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {Schema} from '../shared/Model/table.model';


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
    {name: 'ADMIN', password: 'ADMIN'},
    {name: 'USER', password: 'USER'}
  ];

  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    const instance = dialogRef.componentInstance;
    instance.SchemaArray = this.SCHEMA;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  log(event: any) {
   console.log(event.target.parentNode.nextSibling.innerHTML);
  }


}

export interface PeriodicElement {
  name: string;
  password: string;
}
