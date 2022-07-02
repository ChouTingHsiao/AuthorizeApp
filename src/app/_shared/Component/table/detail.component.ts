import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/Component/table/dialog/dialog.component';
import { Detail } from '@shared/Model/table.model';
import { Dialog } from '@shared/Model/dialog.model';
import { entityToArray } from '@shared/Method/object.method';
import { sortData, pageData, columnToDisplay, openDialog } from '@shared/Method/table.method';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  @Input()
  detail: Observable<Detail<unknown>>;

  @Output()
  openDetailDialog: EventEmitter<(dialog: Dialog) => unknown> = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<unknown>;

  displayedColumns: string[];

  dialogComponent: DialogComponent;

  create: () => void;

  edit: (element: unknown, event: unknown) => void;

  delete: (element: unknown, event: unknown) => void;

  sortData: (sort: Sort) => void = sortData;

  pageData: (page: PageEvent) => void = pageData;

  isLoading = true;

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
        this.isLoading = false;
        const entitiesArray = entityToArray(y);
        this.dataSource = new MatTableDataSource<unknown>(entitiesArray);
        this.pageNation();
      }, error => this.isLoading = false);
      this.create = x.create;
      this.edit = x.edit;
      this.delete = x.delete;
      this.displayedColumns = columnToDisplay(x.columns);
      this.openDetailDialog.emit(openDialog(this.matDialog, x.columns));
    });
  }

  pageNation() {

    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
  }
}
