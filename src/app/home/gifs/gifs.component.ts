import { Component, OnInit, OnDestroy, ViewChild, ElementRef, DoCheck , Inject} from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { GifsService } from './gifs.service';
import { PhotoModel } from '../photo.model';
import { retry, debounceTime } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@AutoUnsubscribe()
@Component({
    templateUrl: './gifs.component.html',
    styleUrls: ['./gifs.component.css']
})
export class GifsComponent implements OnInit, OnDestroy, DoCheck {

    public photos: PhotoModel[] = []
    @ViewChild('scroll') public scroll: ElementRef<HTMLDivElement>

    constructor(private gifsService: GifsService, private alertService: AlertService, private platformDetector: PlatformDetectorService) {}

    ngOnInit(): void {
        if(!this.photos.length) this.getImagesFromService()
    }

    ngDoCheck() {
        this.platformDetector.isPlatformBrowser() && setTimeout(() => this.loadImagesOnScroll(), 2000)
    }
    
    ngOnDestroy(): void {}
    
    public getImagesFromService() {
        this.gifsService.getImages()
            .pipe(retry(2))
            .pipe(debounceTime(500))
            .subscribe((photos) => {
                this.photos = this.photos.concat(photos)
            }, (err) => {
                console.log(err)
                this.alertService.danger("Holy cat! I'm sorry but it was not possible to load the animated gifs :(, try again later.")
            })
    }
    
    public loadMoreImages() {
        this.getImagesFromService()
    }
    
    public loadImagesOnScroll() {
        if(this.scroll.nativeElement.offsetTop / 1.2 < window.scrollY) {
            this.loadMoreImages()
        }
    }
}