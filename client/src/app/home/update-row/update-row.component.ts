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
  @Input() rowData: any;
  @Output() userData: EventEmitter<any> = new EventEmitter<any>();
  // ImageUpload: any;
  // email: any;
  constructor(
    private _userService: RegisterService,
    private http: HttpClient, private dataSharingService: DataSharingService
  ) {}
    public deleteFn :any
    public id : any
    public email:any
    public name:any
    public params!: ICellRendererParams;
    // private rowData:any;
  agInit(params: any): void {
    // console.log(this.rowData);
    this.params = params;
    this.deleteFn = params.deleteFn
    // this.ImageUpload = params.ImageUpload
    this.id = params.data._id
    this.email = params.data.email
    this.name = params.data.name
    // this.email = params.data.email
    // console.log(this.params);

    // this.rowData = this.params.data;
  }
  deleteWrapper(){
    this.deleteFn(this.id)
  }
  // ImageWrapper(){
  //   this.ImageUpload(this.id)
  // }
  // showData(){
  //   this.dataSharingService.updateRowData(this.rowData);
  // }
  userList:any;
  // @Input() rowData: any;
  refresh(): boolean {
    return false;
  }
  // @Input() gridApi!: GridApi;

  // onDeleteButtonClick() {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You will not be able to recover this user!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, keep it',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const id = this.params.data._id;
  //       console.log(id);
  //       this._userProfile.deleteUser(id).subscribe(() => {
  //         Swal.fire('Success!', 'User deleted successfully.', 'success');

  //         // console.log(this.rowData)
  //         // Remove the deleted row from the rowData array
  //         // const index = this.rowData.findIndex((row: any) => row._id === id);
  //         this._userProfile.getUsers().subscribe((data)=>{
  //             this.userList = data;
  //             console.log(this.userList);
  //             // this.rowData = this.userList;

  //             this.doSomethingWithData()
  //           });

  //         });
  //         // console.log("Khushi" + this.userList);
  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         console.log('User not deleted');
  //       }
  //     });
  //   }
//     doSomethingWithData(){
//       console.log("Khushi "+JSON.stringify(this.userList));
//       this.rowData = JSON.stringify(this.userList);
//       console.log("RowData: "+this.rowData);

//       this.userData.emit(this.rowData);
//       // console.log(this.u);
//  }


  onUpdateButtonClick() {
    const email = this.params.data.email;
    Swal.fire({
      title: "Update your info!",
      html:
      '<input id="email" class="swal2-input" value="'+ email + '" autocapitalize="off">' +
      '<input id="name" class="swal2-input" value="'+ this.name +'" autocapitalize="off">',
      inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "Update",
    showLoaderOnConfirm: true,
    preConfirm:()=>{
      const emailElement = document.querySelector<HTMLInputElement>('#email');
      const nameElement = document.querySelector<HTMLInputElement>('#name');
      if (!emailElement || !nameElement) {
        Swal.showValidationMessage('Email input fields not found');
        return;
      }
        const updateEmail = emailElement.value.trim();
        const updateName = nameElement.value.trim()
        // console.log(updateEmail+" "+updateName);
        this._userService.updateUser(this.id,updateEmail,updateName).subscribe(()=>{
        // Swal.fire('Success!', 'User deleted successfully.', 'success');
        console.log("User Updated yuhuuu!!");

        // return{
      })
      //   email:updateEmail,
      //   name: updateName
      // }
    }

  })
  console.log(email);
  }


  onFileSelected(event: any) {
    const email = this.params.data.email;
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('email', email);
    formData.append('img', file);
    // console.log(id);

    // console.log(formData);

    this._userService.getProfile(formData).subscribe((response) => {
      Swal.fire('Success!', 'Image uploaded successfully.', 'success');
    });
  }
}


