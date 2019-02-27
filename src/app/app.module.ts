import { NgtUniversalModule } from '@ng-toolkit/universal';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app.routing.module';
import { ErrorsModule } from './errors/errors.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports:[
 CommonModule,
 NgtUniversalModule,
HttpClientModule,
 TransferHttpCacheModule,
    CommonModule,
    
    HomeModule,

    AppRoutingModule,
    CoreModule,
    ErrorsModule
  ],
  providers: [],
})
export class AppModule { }
