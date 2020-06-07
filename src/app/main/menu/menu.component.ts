import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableComponent } from '@shared/Component/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { Program } from '@shared/Model/program.model';
import { Menu } from '@shared/Model/menu.model';
import { ProgramService } from '@services/program/program.service';
import { MenusCreate, MenusRead, MenusEdit, MenusDelete} from '@shared/ngrx/Actions/menu.action';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  tableComponent: TableComponent;

  myGrid: Grid;

  Menus: Menu[];

  Programs: Program[];

  constructor(private store: Store<any>,
              private programService: ProgramService) { }

  ngOnInit() {
    this.programService.getAll().subscribe((programs) => this.Programs = programs);
    this.loadGrid();
    this.store.dispatch( new MenusRead<Menu>(TableEnum.Menus) );
  }

  loadGrid() {
    this.myGrid = {
      tableName: TableEnum.Menus,
      dataSource: this.store.select(TableEnum.Menus),
      sort: { active: 'id', direction: 'asc' },
      columns: [
        {
          header: 'Id',
          columnDef: 'id',
          type: ColumnEnum.string,
          selector: ColumnEnum.label,
          visible: false,
          cell: (element: Menu) => `${ element.id }`
        },
        {
          header: 'Name',
          columnDef: 'name',
          type: ColumnEnum.string,
          selector: ColumnEnum.input,
          cell: (element: Menu) => `${ element.name }`
        },
        {
          header: 'Link',
          columnDef: 'link',
          type: ColumnEnum.string,
          selector: ColumnEnum.multiselect,
          cell: (element: Menu) => `${ element.link }`
        },
      ],
      create: () => {
        this.store.dispatch( new MenusCreate<Menu>(
          TableEnum.Menus,
          [],
          this.tableComponent.dialogComponent.getData() as Menu)
        );
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
        this.store.dispatch( new MenusEdit<Menu>(
          TableEnum.Menus,
          [],
          this.tableComponent.dialogComponent.getData() as Menu)
        );
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

      },
      delete: (event: any) => {

        const element = event.target as HTMLElement;

        const nextNode = element.closest('td').nextSibling as HTMLElement;

        this.store.dispatch( new MenusDelete<Menu>(
          TableEnum.Menus,
          [],
          {id: nextNode.innerHTML.trim()} as Menu)
        );
      },
    };
  }

  initComponentHandler(component: TableComponent) {
    this.tableComponent = component;
  }

}
