import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { MenuComponent } from './menu.component';

import { TableComponent } from '@shared/Component/table/table.component';

import { MatTableModule } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatSortModule } from '@angular/material/sort';

import { MatCardModule } from '@angular/material/card';

import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';

import { StoreModule } from '@ngrx/store';

import { ROOT_REDUCER } from '@shared/Ngrx/Reducer/root.reducer';

import { of } from 'rxjs';

import { ProgramService } from '@services/program/program.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

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
        MenuComponent,
        TableComponent
      ],
      providers: [
        {
          provide: ProgramService, useValue: {
            getAll: () => of( [
              { id: '1', name: 'User', remark: '使用者', linkTag: 'User', auth: '1' },
              { id: '2', name: 'Role', remark: '角色', linkTag: 'Role', auth: '1' },
              { id: '3', name: 'Group', remark: '群組', linkTag: 'Group', auth: '' },
              { id: '4', name: 'Program', remark: '程式', linkTag: 'Program', auth: '' },
              { id: '5', name: 'Menu', remark: '選單', linkTag: 'Menu', auth: '' }
            ])
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
