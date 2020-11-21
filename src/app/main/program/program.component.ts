import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { Group } from '@shared/Model/group.model';
import { Program } from '@shared/Model/program.model';
import { GroupService } from '@services/group/group.service';
import { Read, Create, Edit, Delete} from '@shared/ngrx/Actions/maintain.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  tableComponent: TableComponent;

  myGrid: Observable<Grid>;

  constructor(private store: Store<any>,
              private groupService: GroupService) { }

  ngOnInit() {

    this.groupService.getAll().subscribe((groups) => {
      this.loadGrid(groups);
      this.store.dispatch( new Read<Program>(TableEnum.Programs) );
    });

  }

  loadGrid(groups: Group[]) {

    this.myGrid = new Observable(subscriber => {

      const grid = {
        tableName: TableEnum.Programs,
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
            header: 'LinkTag',
            columnDef: 'linkTag',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (element: Program) => `${ element.linkTag }`
          },
          {
            header: 'Auth',
            columnDef: 'auth',
            type: ColumnEnum.string,
            selector: ColumnEnum.select,
            source: (): Observable<any> => {

              this.store.dispatch( new Read<Group>(TableEnum.Groups) );

              return this.store.select(TableEnum.Groups);
            },
            cell: (element: Program) => `${
              element.auth === '' ? '' :
              groups.filter(x => x.id ===  element.auth)[0].name
            }`
          },
        ],
        read: (): Observable<any> => {

          return this.store.select(TableEnum.Programs);

        },
        create: (): void => {

          this.tableComponent.openDialog({
            title: '新增頁面',
            button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
            method: DialogEnum.create,
            confirm: () => {
              this.store.dispatch( new Create<Program>(
                TableEnum.Programs,
                [],
                this.tableComponent.dialogComponent.getData() as Program )
              );
            }
          });

        },
        edit: (event: any): void => {

          const element = event.target as HTMLElement;

          const nextNode = element.closest('td').nextSibling as HTMLElement;

          const data =  this.tableComponent.dataSource.data.filter(y => y.id === nextNode.innerHTML.trim());

          this.tableComponent.openDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data:  data[0],
            confirm: () => {
              this.store.dispatch( new Edit<Program>(
                TableEnum.Programs,
                [],
                this.tableComponent.dialogComponent.getData() as Program )
              );
            }
          });

        },
        delete: (event: any): void => {

          const element = event.target as HTMLElement;

          const nextNode = element.closest('td').nextSibling as HTMLElement;

          this.store.dispatch( new Delete<Program>(
            TableEnum.Programs,
            [],
            {id: nextNode.innerHTML.trim()} as Program )
          );
        }
      };

      subscriber.next(grid);
      subscriber.complete();

    });

  }

  initComponentHandler(component: TableComponent) {

    this.tableComponent = component;

  }
}
