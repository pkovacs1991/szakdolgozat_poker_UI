import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerFormComponent } from './poker-form.component';

describe('PokerFormComponent', () => {
  let component: PokerFormComponent;
  let fixture: ComponentFixture<PokerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
