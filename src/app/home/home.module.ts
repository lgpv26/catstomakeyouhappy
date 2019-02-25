import { NgModule } from "@angular/core";
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { LoadingModule } from '../shared/component/loading/loading.module';
import { BreedsModule } from './breeds/breeds.module';
import { CategoriesModule } from './categories/categories.module';
import { GifsModule } from './gifs/gifs.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HttpClientModule, LoadingModule, BreedsModule, CategoriesModule, GifsModule],
})
export class HomeModule {}