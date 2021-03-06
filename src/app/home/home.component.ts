import { Component, OnInit, OnDestroy, ViewChild, ElementRef, DoCheck , Inject} from '@angular/core';
import { PhotoListService } from './photo-list.service';
import { PhotoModel } from './photo.model';
import { retry } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AlertService } from '../shared/alert/alert.service';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { PlatformDetectorService } from '../core/platform-detector/platform-detector.service';
 
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
        private alertService: AlertService,
        private platformDetector: PlatformDetectorService) { }

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
        this.platformDetector.isPlatformBrowser() && setTimeout(() => this.loadOnScroll(), 2000)
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
        if(this.scroll.nativeElement.offsetTop / 1.2 < window.scrollY) {
            this.load()
        }
    }
}
