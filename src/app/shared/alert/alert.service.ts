import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';
import { AlertModel, AlertType } from './alert-type.model'
import { Router, NavigationStart } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AlertService {

    public alertSubject: Subject<AlertModel> = new Subject<AlertModel>()
    public keepAfterRouteChange: boolean

    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if(event instanceof NavigationStart) {
                if(this.keepAfterRouteChange) 
                    this.keepAfterRouteChange = false
                else 
                    this.clear()
            }
        })
    }

    public success(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange)
    }

    public warning(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.WARNING, message, keepAfterRouteChange)
    }

    public danger(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.DANGER, message, keepAfterRouteChange)
    }

    public info(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.INFO, message, keepAfterRouteChange)
    }

    private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean) {
        this.keepAfterRouteChange = keepAfterRouteChange
        this.alertSubject.next(new AlertModel(alertType, message))
    }

    public getAlert() {
        return this.alertSubject.asObservable()
    }

    public clear() {
        this.alertSubject.next(null)
    }
}