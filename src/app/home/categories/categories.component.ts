import { Component, OnInit, OnDestroy, ElementRef, ViewChild, DoCheck } from "@angular/core";
import { CategoriesService } from './categories.service';
import { CategoriesPhotoModel } from './categories-photo.model';
import { FormGroup, FormControl } from '@angular/forms';
import { PhotoModel } from '../photo.model';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { retry } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

declare var $: any

@AutoUnsubscribe()
@Component({
    templateUrl: './categories.component.html',
    styleUrls: ['categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy, DoCheck{

    @ViewChild('scroll') public scroll: ElementRef

    public categories: CategoriesPhotoModel[] = []
    public categorySelected: CategoriesPhotoModel
    public photos: PhotoModel[] = []

    public form = new FormGroup({
        category: new FormControl()
    })

    constructor(private categoriesService: CategoriesService, private router: Router, private alertService: AlertService) {}

    ngOnInit() {
        if(!this.photos.length) this.getAllCategoriesToList()
    }
    
    ngDoCheck() {
        setTimeout(() => this.loadMoreCatsOnScroll(), 2000)
    }

    ngOnDestroy() {}

    public getAllCategoriesToList() {
        this.categoriesService.getAllCategories()
            .subscribe((categories) => {
                this.categories = categories
                this.getPhotosOfTheSelectedCategory(this.categories[0])
                this.form.get('category').setValue(this.categorySelected = this.categories[0])
            }, (err) => {
                console.log(err)
                this.router.navigate(['error'])
            })
    }


    public getPhotosOfTheSelectedCategory(categorySelected: CategoriesPhotoModel) {
        this.categoriesService.getCategoriesById(categorySelected.id)
            .pipe(retry(2))
            .subscribe(
                (photos) => this.photos = photos,
                (err) => {
                    console.log(err)
                    this.alertService.danger('Holy cat, it was not possible to load the photos, try again later and my sorry :(')
                })
    }

    public loadMoreCats(categorySelected: CategoriesPhotoModel) {
        this.categoriesService.getCategoriesById(categorySelected.id)
            .subscribe(
                (photos) => this.photos = this.photos.concat(photos),
                (err) => {
                    console.log(err)
                    this.alertService.danger('Holy cat, it was not possible to load the photos, try again later and my sorry :(')
                }    
            )
    }

    public loadMoreCatsOnScroll() {
        if(this.scroll.nativeElement.offsetTop / 1.2 < $(window).scrollTop()) {
            this.loadMoreCats(this.form.get('category').value)
        }
    }
}