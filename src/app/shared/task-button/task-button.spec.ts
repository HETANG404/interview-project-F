import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskButtonComponent } from './task-button';

describe('TaskButton', () => {
  let component: TaskButtonComponent;
  let fixture: ComponentFixture<TaskButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
