import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'password'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
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
