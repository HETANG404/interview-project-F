import { Component,Output,EventEmitter  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../models/task'

@Component({
  selector: 'app-task-button',
  imports: [],
  standalone: true, 
  templateUrl: './task-button.html',
  styleUrl: './task-button.scss',
})


export class TaskButtonComponent  {
  private readonly dataUrl = 'http://127.0.0.1:8000/users';
  constructor(private http:HttpClient){}

    NewTask: Task = {
    myid: 3,
    title: 'test',
    description: 'test',
    tags: ['test','test']
  };

  handleClick() {
    this.http.post<Task>(this.dataUrl, this.NewTask).subscribe({
      next: (res) => console.log('POST success:', res),
      error: (err) => console.error('POST error:', err)
    });
  }
}
