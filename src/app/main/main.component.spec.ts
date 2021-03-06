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

import { provideMockStore } from '@ngrx/store/testing';

import { Menus, MenusState } from '@shared/Dexie/data';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  const initialState = MenusState;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        RouterTestingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
      ],
      declarations: [ MainComponent ],
      providers: [
        {
          provide: MenuService, useValue: {
            getByAuth: () => of ( Menus )
          }
        },
        provideMockStore({ initialState }),
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

  it(`should show title Authorize`, () => {
    fixture = TestBed.createComponent(MainComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Authorize');
  });

  it('should show text Hello!!', () => {
    fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-sidenav-content span').textContent).toContain('Hello!!');
  });

});
