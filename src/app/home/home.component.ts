import { Component, OnInit, OnDestroy, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { PhotoListService } from './photo-list.service';
import { PhotoModel } from './photo.model';
import { take, retry } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AlertService } from '../shared/alert/alert.service';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Meta } from '@angular/platform-browser';

declare var $: any
 
@AutoUnsubscribe()
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, DoCheck {

    public photoList: PhotoModel[] = []
    @ViewChild('scroll') public scroll: ElementRef

    constructor(
        private photoListService: PhotoListService,
        private router: Router,
        private alertService: AlertService) { }

    ngOnInit() {
        this.photoListService.listPhotos(9, 'Rand')
            .pipe(retry(2))
            .subscribe(
                (photoList) => {
                    if(!photoList.length) this.photoList = this.photoList.concat(photoList)
                    this.photoList = this.photoList.concat(photoList)
                }, 
                (err) => {
                    console.log(err)
                    this.router.navigate(['error'])
                })
    }

    ngDoCheck() {
        setTimeout(() => this.loadOnScroll(), 2000)
    }

    ngOnDestroy() {
    }

    public load() {
        this.photoListService.listPhotos(9, 'Rand')
            .pipe(retry(2))
            .subscribe(
                (photoList) => {
                    this.photoList = this.photoList.concat(photoList)
                },
                (err) => {
                    console.log(err)
                    this.alertService.danger('Holy cat, it was not possible to load the photos, try again later and my sorry :(')
                }
            )
    }

    public loadOnScroll() {
        if(this.scroll.nativeElement.offsetTop / 1.2 < $(window).scrollTop()) {
            this.load()
        }
    }
}
