import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandyCatcherComponent } from './candy-catcher.component';

describe('CandyCatcherComponent', () => {
  let component: CandyCatcherComponent;
  let fixture: ComponentFixture<CandyCatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandyCatcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandyCatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
