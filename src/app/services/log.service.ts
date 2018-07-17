import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

import { Log } from '../models/log';
import { currentId } from 'async_hooks';
@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id:null, text: null, date: null});
  selectedLog = this.logSource.asObservable();

  constructor() { 
    this.logs = [
      {id: '1', text: 'Generated components', date: new Date('7/6/2018 10:30:07')},
      {id: '2', text: 'Added Bootstrap', date: new Date('7/6/2018 10:31:09')},
      {id: '3', text: 'Added another thing', date: new Date('7/6/2018 10:35:07')},
    ]
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
  }
}
