import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app.routing.module';
import { ErrorsModule } from './errors/errors.module';
import { BreedsModule } from './home/breeds/breeds.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports:[
  CommonModule,
  NgtUniversalModule,

  TransferHttpCacheModule,
  HttpClientModule,
 
    
    HomeModule,
    BreedsModule,
    AppRoutingModule,
    CoreModule,
    ErrorsModule
  ],
  providers: [],
})
export class AppModule { }
