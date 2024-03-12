import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  constructor() { }
  private rowDataSubject = new BehaviorSubject<any>(null);
  rowData$ = this.rowDataSubject.asObservable();
    updateRowData(rowData: any): void {
    this.rowDataSubject.next(rowData);
  }
}
