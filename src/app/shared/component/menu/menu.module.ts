import { NgModule } from "@angular/core";
import { MenuComponent } from './menu.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [MenuComponent],
    imports: [CommonModule],
    exports: [MenuComponent]
})
export class MenuModule {
    
}