import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizeComponent } from './unauthorize.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('UnauthorizeComponent', () => {
  let component: UnauthorizeComponent;
  let fixture: ComponentFixture<UnauthorizeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ UnauthorizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
