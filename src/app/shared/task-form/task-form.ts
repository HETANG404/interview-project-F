import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskFormComponent {
  // Simple form data - no complex validation
  myid: number = 1;
  title: string = '';
  description: string = '';
  tags: string = '';
  message: string = '';

  constructor(private taskService: TaskService) {}

  onSubmit() {
    console.log('Form submitted with title:', this.title);
    console.log('Title length:', this.title.length);
    console.log('Title trimmed:', this.title.trim());
    
    // Simple validation
    if (!this.title || !this.title.trim()) {
      this.message = 'Please enter a title';
      return;
    }

    // Create task data
    const taskData: Task = {
      myid: this.myid,
      title: this.title,
      description: this.description,
      tags: this.tags ? this.tags.split(',').map(tag => tag.trim()) : []
    };

    console.log('Submitting task data:', taskData);

    // Submit task
    this.taskService.addTask(taskData).subscribe({
      next: (res) => {
        this.message = 'Task added successfully!';
        this.taskService.triggerRefresh();
        this.resetForm();
      },
      error: (err) => {
        this.message = 'Error: ' + err.message;
      }
    });
  }

  resetForm() {
    this.myid = 1;
    this.title = '';
    this.description = '';
    this.tags = '';
    this.message = '';
  }
}
