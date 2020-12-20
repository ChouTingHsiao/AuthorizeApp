import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { ProgramComponent } from './program.component';

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

import { GroupService } from '@services/group/group.service';

import { Groups } from '@shared/Dexie/data';

describe('ProgramComponent', () => {
  let component: ProgramComponent;
  let fixture: ComponentFixture<ProgramComponent>;

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
        ProgramComponent,
        TableComponent
      ],
      providers: [
        {
          provide: GroupService, useValue: {
            getAll: () => of ( Groups )
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
