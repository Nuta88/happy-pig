import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddExpensesModalComponent} from './add-expenses-modal.component';

describe('AddExpensesModalComponent', () => {
  let component: AddExpensesModalComponent;
  let fixture: ComponentFixture<AddExpensesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExpensesModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddExpensesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
