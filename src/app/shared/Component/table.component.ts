import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { Grid } from '../Model/table.model';
import { Dialog } from '../Model/dialog.model';
import { DialogEnum } from '../Enum/dialog.enum';

@Component({
  selector: 'app-table',
  template:
 `<table mat-table [dataSource]="grid.dataSource">
   <!-- Maintain Column -->
   <ng-container matColumnDef="maintain">
   <th mat-header-cell *matHeaderCellDef></th>
   <td mat-cell *matCellDef="let element" >
    <button mat-button color="warn" (click)="grid.editDialog($event)">修改</button>
   </td>
   </ng-container>
   <!-- Column -->
   <ng-container *ngFor="let column of grid.columns" matColumnDef="{{column.columnDef}}">
    <th mat-header-cell *matHeaderCellDef>{{ column.header }}</th>
    <td mat-cell *matCellDef="let element">{{ column.cell(element) }}</td>
   </ng-container>
  <tr mat-header-row *matHeaderRowDef="grid.displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: grid.displayedColumns;"></tr>
  </table>
  <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>`
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input()
  grid: Grid;

  @Output()
  initComponent: EventEmitter<TableComponent> = new EventEmitter();

  dialogComponent: DialogComponent;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.initComponent.emit(this);
  }

  ngAfterViewInit() {
    this.pageNation();
  }

  openDialog(DialogData: Dialog) {

    const dialogRef = this.dialog.open(DialogComponent);

    const instance = dialogRef.componentInstance;

    this.dialogComponent = instance;

    instance.SchemaArray = DialogData.model;

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

  pageNation() {
     this.grid.dataSource.paginator = this.paginator;
  }

}
