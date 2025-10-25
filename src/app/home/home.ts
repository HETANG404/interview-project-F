import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TaskFormComponent } from '../shared/task-form/task-form';
import { TaskListComponent } from '../shared/task-list/task-list';

@Component({
  selector: 'app-home',
  standalone: true,             
  imports: [TaskFormComponent, TaskListComponent], 
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {}