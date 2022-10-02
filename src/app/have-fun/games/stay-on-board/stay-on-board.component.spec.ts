import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayOnBoardComponent } from './stay-on-board.component';

describe('StayOnBoardComponent', () => {
  let component: StayOnBoardComponent;
  let fixture: ComponentFixture<StayOnBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StayOnBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StayOnBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
