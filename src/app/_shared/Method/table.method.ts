import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Column } from '@shared/Model/table.model';

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

export  { sortData, pageData, columnToDisplay, dataToColumn };
