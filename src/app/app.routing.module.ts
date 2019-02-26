import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { BreedsComponent } from './home/breeds/breeds.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { GifsComponent } from './home/gifs/gifs.component';

const ROUTES = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: HomeComponent, data: {
        title: 'Cats To Make You Happy - For you to forget that they ruled the world'
    }},
    {path: 'breeds', component: BreedsComponent, data: {
        title: 'Cat Breed - Know Your Peculiarities'
    }},
    {path: 'categories', component: CategoriesComponent, data: {
        title: 'Categories - Have fun with cats and their crazy'
    }},
    {path: 'gifs', component: GifsComponent, data: {
        title: 'Gifs of cats - A gif funnier than the other'
    }},
    {path: 'error', component: GlobalErrorComponent, data: {
        title: 'Some cat scratched our app'
    }},
    {path: 'not-found', component: NotFoundComponent, data: {
        title: 'No cats here :('
    }},
    {path: '**', redirectTo: 'not-found'}
]

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}