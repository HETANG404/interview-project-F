import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
    // Simple refresh listener
    this.taskService.getRefreshObservable().subscribe(() => {
      this.loadTasks();
    });
  }

  loadTasks() {
    this.loading = true;
    this.error = null;
    
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
        console.log('Tasks loaded:', tasks);
      },
      error: (err) => {
        this.error = err.message || 'Failed to load data';
        this.loading = false;
        console.error('Error loading tasks:', err);
      }
    });
  }
}
