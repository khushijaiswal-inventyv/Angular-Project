import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../services/register.service';
import { AgGridAngular, AgGridModule} from 'ag-grid-angular';
import { GridApi} from 'ag-grid-community';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ImageDisplayComponent } from './image-display/image-display.component';
import { UpdateRowComponent } from './update-row/update-row.component';
import { DataSharingService } from '../services/data-sharing.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AgGridAngular,UpdateRowComponent,AgGridModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  rowData: any;
  columnDefs: any;
  // frameworkComponents: any;
@Input() userData: any;
  constructor(private route: Router, private _getUser: RegisterService, private dataSharingService: DataSharingService) {}
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
        { headerName: 'image', field: 'img', cellRenderer: ImageDisplayComponent},
        { headerName: 'Action', field: 'action', cellRenderer: UpdateRowComponent},
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
  onCellClicked(event: any): void {
    if (event.colDef.field === 'img') {
      // Toggle the display of the image when the image path cell is clicked
      event.api.refreshCells({ force: true });
    }
  }
  updateData(data:any){
    // this.rowData = userData;
    console.log(data);
  }
  // console.log(this.userData);
  // onUserListChange(userList: any): void {
  //   // Handle the updated userList here
  //   console.log('Updated userList:', userList);
  // }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.route.navigate(['/']);
  }
  gridApi!: GridApi;
  defaultColDef = {
    flex: 1,
    minWidth: 100,
  };
  OnGridReady(params: any) {
    this.gridApi = params.api;
  }
}
//  A Cell Renderer allows you to put any HTML / Component you like into a Cell of AG Grid.
// For example if it's an HTML Button, then you can add you own event listener to that button to do an action.
