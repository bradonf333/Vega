import { AuthService } from './../../service/auth.service';
import { ProgressService } from './../../service/progress.service';
import { PhotoService } from './../../service/photo.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  vehicleId: number;
  vehicle: any;
  photos: any[];
  progress: any;

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private vehicleService: VehicleService,
    private progressService: ProgressService,
    private auth: AuthService) {

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });
  }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId)
      .subscribe(photos => this.photos = photos);

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
      v => this.vehicle = v,
      err => {
        if (err.status == 404) {
          this.router.navigate(['/vehicles']);
          return;
        }
      });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.deleteVehicle(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/home']);
        });
    }
  }

  uploadPhoto() {

    this.progressService.startTracking()
      .subscribe(progress => {
        console.log(progress);
        this.zone.run(() => {
          this.progress = progress;
        });
      });

    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files![0];
    nativeElement.value = '';

    this.photoService.upload(this.vehicleId, file)
      .subscribe(photo => {
        this.photos.push(photo);
      },
      err => {
        alert(err.text());
      });
  }
}
