import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';

import { MainComponent } from './main.component';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';

import { MatIconModule } from '@angular/material/icon';

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
      declarations: [ MainComponent ]
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
