import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  loading: boolean = false;
  error: string | null = null;
  searchTerm: string = '';

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
        // 如果有搜索词，重新应用搜索；否则显示所有任务
        if (this.searchTerm.trim()) {
          this.filteredTasks = this.taskService.searchTasks(tasks, this.searchTerm);
        } else {
          this.filteredTasks = tasks;
        }
        this.loading = false;
        console.log('Tasks loaded:', tasks);
        console.log('Filtered tasks:', this.filteredTasks);
      },
      error: (err) => {
        this.error = err.message || 'Failed to load data';
        this.loading = false;
        console.error('Error loading tasks:', err);
      }
    });
  }

  onSearch() {
    console.log('Searching for:', this.searchTerm);
    console.log('All tasks:', this.tasks);
    this.filteredTasks = this.taskService.searchTasks(this.tasks, this.searchTerm);
    console.log('Filtered results:', this.filteredTasks);
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredTasks = this.tasks;
  }
}
