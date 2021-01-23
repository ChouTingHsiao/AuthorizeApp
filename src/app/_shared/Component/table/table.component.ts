import { Component, OnChanges, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/Component/table/dialog/dialog.component';
import { Grid } from '@shared/Model/table.model';
import { Dialog } from '@shared/Model/dialog.model';
import { entityToArray } from '@shared/Method/object.method';
import { Observable, Subscription } from 'rxjs';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { sortData, pageData, columnToDisplay, dataToColumn } from '@shared/Method/table.method';
import { DetailComponent } from './detail.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class TableComponent implements OnChanges, OnDestroy {

  subscription: Subscription;

  @Input()
  grid: Observable<Grid>;

  @Output()
  initComponent: EventEmitter<TableComponent> = new EventEmitter();

  @Output()
  detailComponent: EventEmitter<DetailComponent> = new EventEmitter();

  dialogComponent: DialogComponent;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  displayedColumns: string[];

  isHasDetail: boolean;

  currentElement: any;

  create: () => void;

  edit: (element: any, event: any) => void;

  delete: (element: any, event: any) => void;

  sortData: (sort: Sort) => void = sortData;

  pageData: (page: PageEvent) => void = pageData;

  constructor(public matDialog: MatDialog) {}

  ngOnChanges(changes) {
    if (changes.grid && this.grid !== undefined) {
      this.setSource();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setSource() {
    this.grid.subscribe(x => {
      this.subscription = x.read().subscribe((y) => {
        const entitiesArray = entityToArray(y);
        this.dataSource = new MatTableDataSource<any>(entitiesArray);
        this.pageNation();
      });
      this.isHasDetail = x.detail != null;
      this.create = x.create;
      this.edit = x.edit;
      this.delete = x.delete;
      this.displayedColumns = columnToDisplay(x.columns);
      this.initComponent.emit(this);
    });
  }

  pageNation() {

    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;

  }

  openDialog(dialog: Dialog) {

    this.grid.subscribe(x => {

      const dialogRef = this.matDialog.open(DialogComponent);

      const instance = dialogRef.componentInstance;

      this.dialogComponent = instance;

      instance.DialogData = dialog;

      instance.ColumnArray = dataToColumn(dialog.data, x.columns);

      instance.ColumnArray.forEach(element => {
        instance.dynamicAddComponent(element);
      });

      instance.confirm = dialog.confirm;

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

    });

  }

  initComponentHandler(component: DetailComponent) {

    this.detailComponent.emit(component);

  }

}
