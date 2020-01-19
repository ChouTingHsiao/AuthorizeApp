import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'remark'];

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
  remark: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Admin', remark: '管理員群組'},
  {name: 'BelowAdmin', remark: '管理員之下群組'}
];
