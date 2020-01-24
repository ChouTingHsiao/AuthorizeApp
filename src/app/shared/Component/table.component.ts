import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { Grid } from '../Model/table.model';
import { Dialog } from '../Model/dialog.model';

@Component({
  selector: 'app-table',
  template:
 `<table mat-table [dataSource]="grid.dataSource">
   <!-- Maintain Column -->
   <ng-container matColumnDef="maintain">
   <th mat-header-cell *matHeaderCellDef></th>
   <td mat-cell *matCellDef="let element" >
    <button mat-button color="warn" (click)="edit($event)">修改</button>
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

  grid: Grid;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.pageNation();
  }

  edit(event: any) {
    const element = event.target as HTMLElement;
    const next = element.closest('td').nextSibling as HTMLElement;

    console.log(next.innerHTML);
    this.openDialog({
      title: '修改頁面',
      button: ['修改', '取消'],
      template: '<p>test</p>'
    });


  }

  openDialog(DialogData: Dialog) {
    const dialogRef = this.dialog.open(DialogComponent);
    const instance = dialogRef.componentInstance;
    instance.SchemaArray = this.grid.SCHEMA;
    instance.DialogData = DialogData;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  pageNation() {
    this.grid.dataSource.paginator = this.paginator;
  }

}
