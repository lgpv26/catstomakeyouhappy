import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators'
import { LoadingType } from './loading-type.model';

@Injectable({providedIn: 'root'})
export class LoadingService {
    public loadingSubject: Subject<string> = new Subject<string>()

    public getLoading() {
        return this.loadingSubject
            .asObservable()
            .pipe(startWith(LoadingType.LOADDING))
    }

    public startLoading() {
        this.loadingSubject.next(LoadingType.LOADDING)
    }

    public stopLoading() {
        this.loadingSubject.next(LoadingType.STOPPED)
    }
}