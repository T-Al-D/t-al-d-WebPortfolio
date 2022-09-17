import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveIoComponent } from './move-io.component';

describe('MoveIoComponent', () => {
  let component: MoveIoComponent;
  let fixture: ComponentFixture<MoveIoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveIoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
