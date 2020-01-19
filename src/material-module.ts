import {NgModule} from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    exports: [
        MatToolbarModule,
        MatSidenavModule,
        MatGridListModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatPaginatorModule,
        MatTableModule
    ]
})

export class MaterialModule { }
