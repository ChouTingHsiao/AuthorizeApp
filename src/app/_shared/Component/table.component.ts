import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/Component/dialog.component';
import { Grid, Column } from '@shared/Model/table.model';
import { Dialog } from '@shared/Model/dialog.model';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  template:
 `<table
  mat-table
  matSort matSortActive="{{grid.sort.active}}"
  matSortDirection="{{grid.sort.direction}}"
  [dataSource]="grid.dataSource"
  (matSortChange)="sortData($event)" >

   <!-- Maintain Column -->
   <ng-container matColumnDef="maintain">
   <th mat-header-cell *matHeaderCellDef></th>
   <td mat-cell *matCellDef="let element" >
    <button mat-button color="warn" (click)="grid.editDialog($event)">修改</button>
   </td>
   </ng-container>

   <!-- Column -->
   <ng-container *ngFor="let column of grid.columns" matColumnDef="{{column.columnDef}}">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ column.header }}</th>
    <td mat-cell *matCellDef="let element">{{ column.cell(element) }}</td>
   </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
  <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>`
})
export class TableComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  maintain$: Observable<any>;

  @Input()
  grid: Grid;

  @Output()
  initComponent: EventEmitter<TableComponent> = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[];

  dialogComponent: DialogComponent;

  constructor(public dialog: MatDialog, public store: Store<any>) {}

  ngOnInit() {
    this.setSource();
    this.displayedColumns = this.columnToDisplay();
    this.initComponent.emit(this);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(DialogData: Dialog) {

    const dialogRef = this.dialog.open(DialogComponent);

    const instance = dialogRef.componentInstance;

    this.dialogComponent = instance;

    instance.ColumnArray = this.dataToSchema(DialogData.data);

    instance.DialogData = DialogData;

    switch (DialogData.method) {
        case DialogEnum.create:
        instance.confirm = this.grid.create;
        break;
        case DialogEnum.edit:
        instance.confirm = this.grid.edit;
        break;
        default:
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  dataToSchema(data: any): Column[] {
    this.grid.columns.forEach(x => {
         x.value = data[x.columnDef];
    });
    return this.grid.columns;
  }

  columnToDisplay(): string[] {
    const display = ['maintain'];
    const columnArray = this.grid.columns.map((x) => {
      return  x.columnDef;
    });
    return display.concat(columnArray);
  }

  setSource() {
    this.maintain$ = this.store.select('maintainReducer');
    this.subscription = this.maintain$.subscribe((x) => {
      this.grid.dataSource = new MatTableDataSource<any>(x);
      this.pageNation();
    });
  }

  sortData(sort: Sort) {
      console.log(sort.active);
      console.log(sort.direction);
  }

  pageNation() {
    this.grid.dataSource.sort = this.sort;
    this.grid.dataSource.paginator = this.paginator;
  }

}
