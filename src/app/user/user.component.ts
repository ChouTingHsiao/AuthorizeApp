import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { DynamicHostDirective } from '../shared/Directive/dynamichost.Directive';
import { MatTableDataSource } from '@angular/material/table';
import { Grid } from '../shared/Model/table.model';
import { TableComponent } from '../shared/Component/table.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  tableComponent: TableComponent;

  @ViewChild(DynamicHostDirective, {static: true}) dynamicComponentLoader: DynamicHostDirective;

  ELEMENT_DATA: PeriodicElement[] = [
    {id: '1', name: 'ADMIN', password: 'ADMIN'},
    {id: '2', name: 'USER', password: 'USER'}
  ];

  grid: Grid = {
    SCHEMA: [
      {column: 'name', type: 'string', value: ''},
      {column: 'password', type: 'string', value: ''}
    ],
    columns: [
      { columnDef: 'name', header: 'Name', cell: (element: any) => `${element.name}` },
      { columnDef: 'password', header: 'Password', cell: (element: any) => `${element.password}` },
    ],
    displayedColumns: ['maintain', 'name', 'password'],
    dataSource: new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA),
  };

  constructor(private componenFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.dynamicAddComponent();
  }

  create() {
    this.tableComponent.openDialog({
      title: '新增頁面',
      button: ['新增', '取消'],
      template: '<p>test</p>'
    });

    this.ELEMENT_DATA.push({id: '', name: 'TEST', password: 'TEST'});
    this.tableComponent.pageNation();
  }

  dynamicAddComponent() {

    const componentFactory = this.componenFactoryResolver.resolveComponentFactory(TableComponent);

    const viewContainerRef = this.dynamicComponentLoader.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

    const instance = componentRef.instance;

    this.tableComponent = instance;

    instance.grid = this.grid;

    componentRef.changeDetectorRef.detectChanges();
  }

}

export interface PeriodicElement {
  id: string;
  name: string;
  password: string;
}
