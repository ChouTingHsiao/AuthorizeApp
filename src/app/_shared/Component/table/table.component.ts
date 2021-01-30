import { Component, OnChanges, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/Component/table/dialog/dialog.component';
import { Grid, Column } from '@shared/Model/table.model';
import { Dialog } from '@shared/Model/dialog.model';
import { entityToArray } from '@shared/Method/object.method';
import { Observable, Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { sortData, pageData, columnToDisplay, openDialog } from '@shared/Method/table.method';

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
  openTableDialog: EventEmitter<(dialog: Dialog) => DialogComponent> = new EventEmitter();

  @Output()
  openDetailDialog: EventEmitter<(dialog: Dialog) => DialogComponent> = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  displayedColumns: string[];

  columns: Column[];

  isHasDetail: boolean;

  currentElement: any;

  dialogComponent: DialogComponent;

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
      this.create = x.create;
      this.edit = x.edit;
      this.delete = x.delete;
      this.isHasDetail = x.detail != null;
      this.columns = x.columns;
      this.displayedColumns = columnToDisplay(x.columns);
      this.openTableDialog.emit(openDialog(this.matDialog, x.columns));
    });
  }

  pageNation() {

    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;

  }

  initDetailHandler(openDetailDialog: (dialog: Dialog) => DialogComponent) {

    this.openDetailDialog.emit(openDetailDialog);

  }

}
