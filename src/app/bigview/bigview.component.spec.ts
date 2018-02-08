import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigviewComponent } from './bigview.component';

describe('BigviewComponent', () => {
  let component: BigviewComponent;
  let fixture: ComponentFixture<BigviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
