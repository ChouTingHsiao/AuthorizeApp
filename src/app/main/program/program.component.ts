import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { Group } from '@shared/Model/group.model';
import { Program } from '@shared/Model/program.model';
import { GroupService } from '@services/group/group.service';
import { ProgramService } from '@services/program/program.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  Groups: Group[] = this.groupService.getAll();

  tableComponent: TableComponent;

  ELEMENT_DATA: Program[] = this.programService.getAll();

  myGrid: Grid = {
    tableName: TableEnum.Programs,
    dataSource: new MatTableDataSource<Program>(this.ELEMENT_DATA),
    sort: { active: 'id', direction: 'asc' },
    columns: [
      {
        header: 'Id',
        columnDef: 'id',
        type: ColumnEnum.string,
        selector: ColumnEnum.label,
        visible: false,
        cell: (element: Program) => `${ element.id }`,
      },
      {
        header: 'Name',
        columnDef: 'name',
        type: ColumnEnum.string,
        selector: ColumnEnum.input,
        cell: (element: Program) => `${ element.name }`
      },
      {
        header: 'Remark',
        columnDef: 'remark',
        type: ColumnEnum.string,
        selector: ColumnEnum.input,
        cell: (element: Program) => `${ element.remark }`
      },
      {
        header: 'Auth',
        columnDef: 'auth',
        type: ColumnEnum.string,
        selector: ColumnEnum.select,
        source: this.Groups as [],
        cell: (element: Program) => `${
          element.auth === '' ? '' :
          this.Groups.filter(x => x.id ===  element.auth)[0].name
        }`
      },
    ],
    create: () => {
      this.store.dispatch({
        type: `${TableEnum.Programs}.${DialogEnum.create}`,
        payload: {
          name: TableEnum.Programs,
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
        type: `${TableEnum.Programs}.${DialogEnum.edit}`,
        payload: {
          name: TableEnum.Programs,
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

  constructor(private store: Store<any>,
              private groupService: GroupService,
              private programService: ProgramService) { }

  ngOnInit() {
    this.store.dispatch({
      type: `${TableEnum.Programs}.${DialogEnum.read}`,
      payload: {
        source: this.myGrid.dataSource.data
      }
    });
  }

  initComponentHandler(component: TableComponent) {
    this.tableComponent = component;
  }
}
