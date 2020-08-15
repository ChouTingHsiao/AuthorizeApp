import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';

import { MainComponent } from './main.component';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';

import { MatIconModule } from '@angular/material/icon';

import { MenuService } from '@services/menu/menu.service';

import { of } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        RouterTestingModule
      ],
      declarations: [ MainComponent ],
      providers: [
        {provide: MenuService, useValue:
          {
            getByAuth: () => of( [
              { id: '1', name: 'User', program: '1'},
              { id: '2', name: 'Role', program: '2'},
              { id: '3', name: 'Group', program: '3'},
              { id: '4', name: 'Program', program: '4'},
              { id: '5', name: 'Menu', program: '5'},
            ])
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Authorize'`, () => {
    fixture = TestBed.createComponent(MainComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Authorize');
  });

  it('should render title', () => {
    fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-sidenav-content span').textContent).toContain('Hellow!!');
  });

});
