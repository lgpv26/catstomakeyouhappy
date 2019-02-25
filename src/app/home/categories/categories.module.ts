import { NgModule } from "@angular/core";
import { CategoriesComponent } from './categories.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CategoriesComponent],
    imports: [CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule]
})
export class CategoriesModule {}