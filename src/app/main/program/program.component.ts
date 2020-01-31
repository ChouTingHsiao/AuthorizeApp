import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { Grid } from '@shared/Model/table.model';
import { Program } from '@shared/Model/program.model';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  tableComponent: TableComponent;

  ELEMENT_DATA: Program[] = JSON.parse(localStorage.getItem('Programs'));

  myGrid: Grid = {
    dataSource: new MatTableDataSource<Program>(this.ELEMENT_DATA),
    sort: { active: 'id', direction: 'asc' },
    columns: [
      { columnDef: 'id', header: 'Id', type: 'string', cell: (element: Program) => `${ element.id }` },
      { columnDef: 'name', header: 'Name', type: 'string', cell: (element: Program) => `${ element.name }` },
      { columnDef: 'remark', header: 'Remark', type: 'string', cell: (element: Program) => `${ element.remark }` },
      { columnDef: 'auth', header: 'Auth', type: 'string', cell: (element: Program) => `${ element.auth }` },
    ],
    create: () => {
      this.store.dispatch({
        type: DialogEnum.create,
        payload: {
          source: this.myGrid.dataSource.data,
          newData: this.tableComponent.dialogComponent.getData() as Program
        }
      });
    },
    createDialog: () => {
      this.tableComponent.openDialog({
        title: '新增頁面',
        button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
        method: DialogEnum.create,
        data:  '',
      });
    },
    edit: () => {
      this.store.dispatch({
        type: DialogEnum.edit,
        payload: {
          source: this.myGrid.dataSource.data,
          newData: this.tableComponent.dialogComponent.getData() as Program
        }
      });
    },
    editDialog: (event: any) => {

      const element = event.target as HTMLElement;

      const nextNode = element.closest('td').nextSibling as HTMLElement;

      const data =  this.myGrid.dataSource.data.filter(x => x.id === nextNode.innerHTML.trim());

      this.tableComponent.openDialog({
        title: '修改頁面',
        button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
        method: DialogEnum.edit,
        data:  data[0],
      });

    }
  };

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch({
      type: DialogEnum.read,
      payload: {
        source: this.myGrid.dataSource.data
      }
    });
  }

  initComponentHandler(component: TableComponent) {
    this.tableComponent = component;
  }
}
