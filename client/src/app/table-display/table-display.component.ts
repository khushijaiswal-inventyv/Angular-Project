import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GridApi,  GridReadyEvent,  ICellRendererParams } from 'ag-grid-community';
import { RegisterService } from '../services/register.service';

// import User from '../user';
import Swal from 'sweetalert2';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';

// import { GridOptionsService } from 'ag-grid-community';

@Component({
  selector: 'app-table-display',
  standalone: true,
  imports: [AgGridAngular, CommonModule, AgGridModule,],
  templateUrl: './table-display.component.html',
  styleUrl: './table-display.component.css'
})
export class TableDisplayComponent implements OnInit{
  rowData: any;
  columnDefs: any;
  // frameworkComponents: any;
// @Input() userData: any;
  constructor(private _getUser: RegisterService,) {}
  ngOnInit(): void {
    // this.frameworkComponents={
    //   'updateRowComponent' : UpdateRowComponent
    // }
    this._getUser.getUsers().subscribe((data) => {
      this.rowData = data;
      // this.columnDefs = Object.keys(this.rowData[0]).map(key => ({ headerName: key.toUpperCase(), field: key,}));
      this.columnDefs = [
        { headerName: 'Email', field: 'email' },
        { headerName: 'Name', field: 'name' },
        { headerName: 'ID', field: '_id' },
        { headerName: 'image', field: 'img'},
        { headerName: 'Action', field: 'action', cellRenderer: this.actionRenderer},
      ];
      // console.log(this.rowData);
      // console.log(this.rowData);
      // this.gridApi.setRowData(this.rowData);
    });
    // this.dataSharingService.rowData$.subscribe((rowData)=>{
    //   console.log('Updated Row Data:', rowData);
    // })

// this.rowData = this.userData;
  }
  isClicked: boolean = false;
  name: any = localStorage.getItem('name');
  OnClick() {
    this.isClicked = !this.isClicked;
  }
  OnGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  actionRenderer() {
    return `<button (click)="update()">Update</button>` +
           `<button (click)="delete()">Delete</button>` +
           '<input type="file" (change)="upload($event)">';
  }

  // onCellClicked(event: any): void {
  //   if (event.colDef.field === 'img') {
  //     // Toggle the display of the image when the image path cell is clicked
  //     event.api.refreshCells({ force: true });
  //   }
  // }
  update(){
    console.log("Updated");
    // console.log(this.rowData)

  }
  // updateData(data:any){
  //   this.rowData = data;
  //   console.log(this.rowData);
  //   // console.log(data);
  // }
  // console.log(this.userData);
  // onUserListChange(userList: any): void {
  //   // Handle the updated userList here
  //   console.log('Updated userList:', userList);
  // }
  // logout() {
  //   sessionStorage.clear();
  //   localStorage.clear();
  //   this.route.navigate(['/']);
  // }
  gridApi!: GridApi;
  defaultColDef = {
    flex: 1,
    minWidth: 100,
  };



}
