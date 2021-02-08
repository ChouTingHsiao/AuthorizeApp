import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Column } from '@shared/Model/table.model';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '@shared/Model/dialog.model';
import { DialogComponent } from '@shared/Component/table/dialog/dialog.component';

function sortData(sort: Sort) {

    console.log(sort.active);

    console.log(sort.direction);

}

function pageData(page: PageEvent) {

    console.log(page);

}

function columnToDisplay(columns: Column[]): string[] {

    const display = ['maintain'];

    const columnArray = columns.filter(data => !(data.visible === false)).map((x) => {

      return  x.columnDef;

    });

    return display.concat(columnArray);

}

function dataToColumn(data: any, columns: Column[]): Column[] {

    if (data !== undefined) {

        columns.forEach(y => {

          y.value = data[y.columnDef];

        });

    }

    return columns;

}

function openDialog( matDialog: MatDialog, columns: Column[]): (dialog: Dialog) => DialogComponent  {

    return ( dialog: Dialog ): DialogComponent => {

        const dialogRef = matDialog.open(DialogComponent);

        const instance = dialogRef.componentInstance;

        instance.DialogData = dialog;

        instance.onChanges = dialog.onChanges;

        instance.ColumnArray = dataToColumn(dialog.data, columns);

        instance.ColumnArray.forEach(element => {
          instance.dynamicAddComponent(element);
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });

        return instance;
    };

}

export { sortData, pageData, columnToDisplay, dataToColumn, openDialog };
