import { NgModule } from "@angular/core";
import { RatingComponent } from './rating.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [RatingComponent],
    imports: [CommonModule],
    exports: [RatingComponent]
})
export class RatingModule {}