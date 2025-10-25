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
}
