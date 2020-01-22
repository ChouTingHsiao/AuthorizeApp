import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'password'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

export interface PeriodicElement {
  name: string;
  password: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'ADMIN', password: 'ADMIN'},
  {name: 'USER', password: 'USER'}
];
