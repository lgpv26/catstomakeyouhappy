import { Component, OnInit, OnDestroy } from "@angular/core";
import { BreedsService } from './breeds.service';
import { BreedsPhotoModel } from './breeds-photo.model';
import { FormGroup, FormControl } from '@angular/forms';
import { PhotoModel } from '../photo.model';
import { debounceTime, retry } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@AutoUnsubscribe()
@Component({
    templateUrl: './breeds.component.html',
    styleUrls: ['./breeds.component.css'],
    providers: [NgbCarouselConfig]
})
export class BreedsComponent implements OnInit, OnDestroy{

    public nrSelect: any
    public ratingLevel: string = '0'

    public photos: PhotoModel[] = []
    public breedsList: BreedsPhotoModel[] = []
    public breedSelected: BreedsPhotoModel
    public form = new FormGroup({
        breed: new FormControl()
    })

    constructor(private breedsService: BreedsService, private alertService: AlertService, private route: Router, configCarousel: NgbCarouselConfig) {
        configCarousel.interval = 5000
    }

    ngOnInit(): void {
        this.listAllBreedsToSelect()
        this.breedsService.getBreeds('abys')
            .subscribe(
                (photos: PhotoModel[]) => {
                    this.photos = photos
                },
                (err) => {
                    console.log(err)
                    this.alertService.danger('Holy cat, it was not possible to load the photos, try again later and my sorry :(')
                })
    }

    ngOnDestroy() {}

    public listAllBreedsToSelect() {
        this.breedsService.getAllBreeds()
            .subscribe(
                (res) => {
                    this.breedsList = this.breedsList.concat(res)
                    this.nrSelect = this.breedSelected = this.breedsList[0]
                    this.form.get('breed').setValue(this.nrSelect)
                },
                (err) => {
                    console.log(err)
                    this.route.navigate(['error'])
                })
    }

    public selectBreed() {
        this.breedSelected = this.form.get('breed').value
        this.breedsService.getBreeds(this.breedSelected.id)
            .pipe(retry(2))
            .pipe(debounceTime(500))
            .subscribe(
                (photos: PhotoModel[]) => {
                    this.photos = photos
                },
                (err) => {
                    console.log(err)
                    this.alertService.danger('Holy cat, it was not possible to load the photos, try again later and my sorry :(')
                })
    }

    public reloadImage() {
        this.breedsService.getBreeds(this.breedSelected.id)
            .pipe(retry(2))
            .pipe(debounceTime(500))
            .subscribe(
                (photos) => this.photos = photos,
                (err) => {
                    console.log(err)
                    this.alertService.danger('Holy cat, it was not possible to load the photos, try again later and my sorry :(')
                })
    }

    public confereRatingLevel(ratingLevel) {
        if(ratingLevel == 5) return ratingLevel = 'rating-5'
        if(ratingLevel == 4) return ratingLevel = 'rating-4'
        if(ratingLevel == 3) return ratingLevel = 'rating-3'
        if(ratingLevel == 2) return ratingLevel = 'rating-2'
        if(ratingLevel == 1) return ratingLevel = 'rating-1'
        if(ratingLevel == 0) return ratingLevel = 'rating-0'
    }
}