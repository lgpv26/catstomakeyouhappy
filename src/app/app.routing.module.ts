import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { BreedsComponent } from './home/breeds/breeds.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { GifsComponent } from './home/gifs/gifs.component';

const ROUTES = [
    {path: '', component: HomeComponent},
    {path: 'breeds', component: BreedsComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'gifs', component: GifsComponent},
    {path: 'error', component: GlobalErrorComponent},
    {path: '**', component: NotFoundComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}