import { Component, OnInit, OnDestroy, ViewChild, ElementRef, DoCheck } from "@angular/core";
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { GifsService } from './gifs.service';
import { PhotoModel } from '../photo.model';
import { retry, debounceTime } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/alert/alert.service';

declare var $: any

@AutoUnsubscribe()
@Component({
    templateUrl: './gifs.component.html',
    styleUrls: ['./gifs.component.css']
})
export class GifsComponent implements OnInit, OnDestroy, DoCheck {

    public photos: PhotoModel[] = []
    @ViewChild('scroll') public scroll: ElementRef<HTMLDivElement>
    @ViewChild('img') public img: ElementRef<HTMLSourceElement>

    constructor(private gifsService: GifsService, private alertService: AlertService) {}

    ngOnInit(): void {
        if(!this.photos.length) this.getImagesFromService()
    }

    ngDoCheck() {
        setTimeout(() => this.loadImagesOnScroll(), 3000)
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
        if(this.scroll.nativeElement.offsetTop / 1.2 < $(window).scrollTop()) {
            this.loadMoreImages()
        }
    }
}