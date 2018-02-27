import { BrowserXhr } from '@angular/http';
import { PaginationComponent } from './shared/pagination.component';
import { VehicleService } from './service/vehicle.service';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleViewComponent } from './components/vehicle-view/vehicle-view.component';
import { PhotoService } from "./service/photo.service";
import { ProgressService, BrowserXhrWithProgress } from "./service/progress.service";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        VehicleViewComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'vehicles/new', component: VehicleFormComponent },
            { path: 'vehicles/:id', component: VehicleFormComponent },
            { path: 'vehicleView/:id', component: VehicleViewComponent },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
        VehicleService, PhotoService, ProgressService 
    ]
})
export class AppModuleShared {
}
