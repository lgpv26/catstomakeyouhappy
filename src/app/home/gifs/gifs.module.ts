import { NgModule } from "@angular/core";
import { GifsComponent } from './gifs.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [GifsComponent],
    imports: [CommonModule, HttpClientModule],
})
export class GifsModule {}