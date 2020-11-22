import { Component, OnChanges, ViewChild, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/Component/dialog.component';
import { Grid, Column } from '@shared/Model/table.model';
import { Dialog } from '@shared/Model/dialog.model';
import { objectToArray } from '@shared/Method/object.method';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  template:
 `<button mat-raised-button (click)="create()"
  class="dark-theme"
   style="font-size: 1em;">Add</button>
  <table
  mat-table
  matSort matSortActive="{{(grid | async)?.sort.active}}"
  matSortDirection="{{(grid | async)?.sort.direction}}"
  [dataSource]="dataSource"
  (matSortChange)="sortData($event)" >

   <!-- Maintain Column -->
   <ng-container matColumnDef="maintain">
   <th mat-header-cell *matHeaderCellDef  style="width: 20%;"></th>
   <td mat-cell *matCellDef="let element" >
    <button mat-raised-button color="accent" (click)="edit(element, $event)">Edit</button>
    &nbsp;
    <button mat-raised-button color="warn" (click)="delete(element, $event)">Delete</button>
   </td>
   </ng-container>

   <!-- Column -->
   <ng-container *ngFor="let column of (grid | async)?.columns" matColumnDef="{{column.columnDef}}">

    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ column.header }}</th>

    <td mat-cell *matCellDef="let element">{{ column.cell(element) }}</td>

   </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
  <mat-paginator [pageSizeOptions]="[5, 10, 20]" (page)="pageData($event)" showFirstLastButtons></mat-paginator>`,
  styleUrls: ['../CSS/main.css']
})
export class TableComponent implements OnChanges, OnDestroy {

  entities = 'entities';

  subscription: Subscription;

  @Input()
  grid: Observable<Grid>;

  @Output()
  initComponent: EventEmitter<TableComponent> = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  displayedColumns: string[];

  dialogComponent: DialogComponent;

  create: () => void;

  edit: (element: any, event: any) => void;

  delete: (element: any, event: any) => void;

  constructor(public dialog: MatDialog, private changeRef: ChangeDetectorRef) {}

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
        const entitiesArray = objectToArray(y[this.entities]);
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

  columnToDisplay(grid: Grid): string[] {

    const display = ['maintain'];

    const columnArray = grid.columns.filter(data => !(data.visible === false)).map((x) => {
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

    this.grid.subscribe(x => {

      const dialogRef = this.dialog.open(DialogComponent);

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

  dataToSchema(data: any, grid: Grid): Column[] {

    if (data !== undefined) {
      grid.columns.forEach(y => {
        y.value = data[y.columnDef];
      });
    }

    return grid.columns;

  }

}
