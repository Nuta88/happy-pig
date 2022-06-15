import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundItemComponent } from './fund-item.component';

describe('FundItemComponent', () => {
  let component: FundItemComponent;
  let fixture: ComponentFixture<FundItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
