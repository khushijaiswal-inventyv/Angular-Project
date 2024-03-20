import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { ICellRendererParams } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-image-display',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './image-display.component.html',
  styleUrl: './image-display.component.css',
})
export class ImageDisplayComponent implements ICellRendererAngularComp {
  constructor(private http: HttpClient, private image: RegisterService) {}

  public params!: ICellRendererParams;
  public showImage: boolean = false;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  // onImageSelected(){
  // const ImagePath = this.params.value;
  // this.http.get(ImagePath, { responseType: 'blob' }).subscribe(
  //   (imageBlob: Blob) => {
  //     // Convert the blob to a data URL
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const imageDataUrl = reader.result as string;
  //       // Display the image in the SweetAlert popup
  //       this.displayImage(imageDataUrl);
  //     };
  //     reader.readAsDataURL(imageBlob);
  //   },
  //   (error:any) => {
  //     console.error('Failed to fetch image:', error);
  //   }
  // );
  // }
  onImagePathClick(): void {
    const _path = this.params.value;

    console.log(_path);
    this.image.getUsers().subscribe((data) => {
      this.displayImage(_path);
    });
    // Display the image in the SweetAlert popup directly using the image path
  }

  displayImage(imageUrl: any): void {
    Swal.fire({
      title: 'Image!',
      text: 'Image...it is!',
      imageUrl: imageUrl,
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Image',
    });
  }
}
