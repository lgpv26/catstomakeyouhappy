import { NgModule } from "@angular/core";
import { GlobalErrorComponent } from './global-error/global-error.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [GlobalErrorComponent, NotFoundComponent],
    imports: [CommonModule, RouterModule]
})
export class ErrorsModule {}