import { BrowserXhrWithProgress } from './service/progress.service';
import { BrowserXhr } from '@angular/http';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        ServerModule,
        AppModuleShared
    ],
    declarations: []
})
export class AppModule {
    
}
