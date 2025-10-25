import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TaskButtonComponent } from '../shared/task-button/task-button';
// import { TaskListComponent } from '../shared/task-button/task-List';

@Component({
  selector: 'app-home',
  standalone: true,             
  imports: [TaskButtonComponent], 
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {}