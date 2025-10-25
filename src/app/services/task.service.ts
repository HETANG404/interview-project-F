import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly dataUrl = 'http://127.0.0.1:8000/users';
  private refreshSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient) {}

  // 发送数据到后端
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.dataUrl, task);
  }

  // 获取所有任务
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.dataUrl);
  }

  // 触发列表刷新
  triggerRefresh() {
    this.refreshSubject.next(true);
  }

  // 监听刷新事件
  getRefreshObservable(): Observable<boolean> {
    return this.refreshSubject.asObservable();
  }

  // 前端搜索功能 - 只根据标题搜索
  searchTasks(tasks: Task[], searchTerm: string): Task[] {
    console.log('Service search - tasks:', tasks);
    console.log('Service search - searchTerm:', searchTerm);
    
    if (!searchTerm.trim()) {
      console.log('Empty search term, returning all tasks');
      return tasks;
    }
    
    const term = searchTerm.toLowerCase().trim();
    const results = tasks.filter(task => {
      const taskTitle = task.title.toLowerCase().trim();
      
      // 多种匹配方式
      const exactMatch = taskTitle === term;
      const includesMatch = taskTitle.includes(term);
      const startsWithMatch = taskTitle.startsWith(term);
      const endsWithMatch = taskTitle.endsWith(term);
      
      const titleMatch = exactMatch || includesMatch || startsWithMatch || endsWithMatch;
      
      console.log(`Search: "${term}" in "${taskTitle}"`);
      console.log(`  Exact: ${exactMatch}, Includes: ${includesMatch}, Result: ${titleMatch}`);
      return titleMatch;
    });
    
    console.log('Search results:', results);
    return results;
  }
}
