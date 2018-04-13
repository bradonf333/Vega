import { ProgressService } from './service/progress.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AdminAuthGuard } from './service/admin-auth.guard';
import { AuthGuard } from './service/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthService } from './service/auth.service';
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


@NgModule({
    declarations: [
        AdminComponent,
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        VehicleViewComponent,
        UserProfileComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuard]  },
            { path: 'vehicles/:id', component: VehicleFormComponent, canActivate: [AuthGuard]  },
            { path: 'vehicleView/:id', component: VehicleViewComponent },
            { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard] },
            { path: 'profile', component: UserProfileComponent },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        VehicleService, PhotoService, ProgressService,
        AuthService, AuthGuard, AdminAuthGuard, AUTH_PROVIDERS
    ]
})
export class AppModuleShared {

}
