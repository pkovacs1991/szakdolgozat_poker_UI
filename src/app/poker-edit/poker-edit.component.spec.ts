import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerEditComponent } from './poker-edit.component';

describe('PokerEditComponent', () => {
  let component: PokerEditComponent;
  let fixture: ComponentFixture<PokerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
