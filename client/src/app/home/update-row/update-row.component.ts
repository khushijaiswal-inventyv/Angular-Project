import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { RegisterService } from '../../services/register.service';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-update-row',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './update-row.component.html',
  styleUrl: './update-row.component.css'
})
export class UpdateRowComponent implements ICellRendererAngularComp {
  // @Output() userData = new EventEmitter<any>();
  constructor(
    private _userProfile: RegisterService,
    private http: HttpClient, private dataSharingService: DataSharingService
  ) {}
  public params!: ICellRendererParams;
    private rowData:any;
  agInit(params: ICellRendererParams): void {
    console.log(this.rowData);
    this.params = params;
    this.rowData = this.params.data;
  }
  showData(){
    this.dataSharingService.updateRowData(this.rowData);
  }
  userList:any;
  // @Input() rowData: any;
  refresh(): boolean {
    return false;
  }
  @Input() gridApi!: GridApi;
  onDeleteButtonClick() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = this.params.data._id;
        console.log(id);
        this._userProfile.deleteUser(id).subscribe(() => {
          Swal.fire('Success!', 'User deleted successfully.', 'success');

          // console.log(this.rowData)
          // Remove the deleted row from the rowData array
          // const index = this.rowData.findIndex((row: any) => row._id === id);
          this._userProfile.getUsers().subscribe((data)=>{
              this.userList = data;
              // this.userData.emit(this.userList);
              console.log(this.userList);
              this.rowData = this.userList;
            });
          });
          console.log("Khushi" + this.userList);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('User not deleted');
      }
    });
  }
  onUpdateButtonClick() {
    const email = this.params.data.email;
    console.log(email);
  }
  onFileSelected(event: any) {
    const email = this.params.data.email;
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('email', email);
    formData.append('img', file);
    this._userProfile.getProfile(formData).subscribe((response) => {
      Swal.fire('Success!', 'Image uploaded successfully.', 'success');
    });
  }
}
