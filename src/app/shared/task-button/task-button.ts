import { Component,Output,EventEmitter  } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-button',
  imports: [],
  standalone: true, 
  templateUrl: './task-button.html',
  styleUrl: './task-button.scss',
})

export class TaskButtonComponent  {
  NewTask: Task = {
    myid: 3,
    title: 'test',
    description: 'test',
    tags: ['test','test']
  };

  constructor(private taskService: TaskService){}

  handleClick() {
    this.taskService.addTask(this.NewTask).subscribe({
      next: (res) => {
        console.log('POST success:', res);
        // 发送成功后触发列表刷新
        this.taskService.triggerRefresh();
      },
      error: (err) => console.error('POST error:', err)
    });
  }
}
