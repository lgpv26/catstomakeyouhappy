import { NgModule } from "@angular/core";
import { BreedsComponent } from './breeds.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'src/app/shared/component/rating/rating.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [BreedsComponent],
    imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RatingModule, NgbCarouselModule]
})
export class BreedsModule {}