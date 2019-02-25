import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../shared/component/loading/loading.module';
import { MenuModule } from '../shared/component/menu/menu.module';
import { RouterModule } from '@angular/router';
import { AlertModule } from '../shared/alert/alert.module';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, LoadingModule, MenuModule, RouterModule, AlertModule],
    exports : [HeaderComponent]
})
export class CoreModule {}