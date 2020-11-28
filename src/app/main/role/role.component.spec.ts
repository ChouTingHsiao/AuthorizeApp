import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { RoleComponent } from './role.component';

import { TableComponent } from '@shared/Component/table/table.component';

import { MatTableModule } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatSortModule } from '@angular/material/sort';

import { MatCardModule } from '@angular/material/card';

import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';

import { StoreModule } from '@ngrx/store';

import { ROOT_REDUCER } from '@shared/ngrx/Reducer/root.reducer';

describe('RoleComponent', () => {
  let component: RoleComponent;
  let fixture: ComponentFixture<RoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(ROOT_REDUCER),
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule
      ],
      declarations: [
        RoleComponent,
        TableComponent
      ],
      providers: [
        TableComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
