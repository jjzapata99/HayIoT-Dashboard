import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrdComponent } from './lrd.component';

describe('LrdComponent', () => {
  let component: LrdComponent;
  let fixture: ComponentFixture<LrdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LrdComponent]
    });
    fixture = TestBed.createComponent(LrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
