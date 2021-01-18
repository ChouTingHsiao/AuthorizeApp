import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@src/app/_shared/Component/table/dialog/dialog.component';
import { Detail, Column } from '@shared/Model/table.model';
import { Dialog } from '@shared/Model/dialog.model';
import { entityToArray } from '@shared/Method/object.method';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  @Input()
  detail: Observable<Detail>;

  @Output()
  initComponent: EventEmitter<DetailComponent> = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  displayedColumns: string[];

  dialogComponent: DialogComponent;

  create: () => void;

  edit: (element: any, event: any) => void;

  delete: (element: any, event: any) => void;

  constructor(public matDialog: MatDialog) {}

  ngOnInit() {

    this.setSource();

  }

  ngOnDestroy() {

    this.subscription.unsubscribe();

  }

  setSource() {

    this.detail.subscribe(x => {
      this.subscription = x.read().subscribe((y) => {
          const entitiesArray = entityToArray(y);
          this.dataSource = new MatTableDataSource<any>(entitiesArray);
          this.pageNation();
      });
      this.create = x.create;
      this.edit = x.edit;
      this.delete = x.delete;
      this.displayedColumns = this.columnToDisplay(x);
      this.initComponent.emit(this);
    });

  }

  pageNation() {

    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;

  }

  columnToDisplay(detail: Detail): string[] {

    const display = ['maintain'];

    const columnArray = detail.columns.filter(data => !(data.visible === false)).map((x) => {
      return  x.columnDef;
    });

    return display.concat(columnArray);
  }

  sortData(sort: Sort) {
    console.log(sort.active);
    console.log(sort.direction);
  }

  pageData(page: PageEvent) {
    console.log(page);
  }

  openDialog(dialog: Dialog) {

    this.detail.subscribe(x => {

      const dialogRef = this.matDialog.open(DialogComponent);

      const instance = dialogRef.componentInstance;

      this.dialogComponent = instance;

      instance.DialogData = dialog;

      instance.ColumnArray = this.dataToSchema(dialog.data, x);

      instance.ColumnArray.forEach(element => {
        instance.dynamicAddComponent(element);
      });

      instance.confirm = dialog.confirm;

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

    });

  }

  dataToSchema(data: any, detail: Detail): Column[] {

    if (data !== undefined) {
      detail.columns.forEach(y => {
        y.value = data[y.columnDef];
      });
    }

    return detail.columns;

  }

}