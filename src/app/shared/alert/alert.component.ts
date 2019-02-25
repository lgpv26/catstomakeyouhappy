import { Component, Input, OnInit } from "@angular/core";
import { AlertModel, AlertType } from './alert-type.model';
import { AlertService } from './alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit{

    @Input() public timeout: number = 5000
    public alerts: AlertModel[] = []

    constructor(private alertService: AlertService) {}

    ngOnInit() {
        this.alertService.getAlert()
            .subscribe((alert) => {
                if(!alert) {
                    this.alerts = []
                    return
                }

                this.alerts.push(alert)
                setInterval(() => this.removeAlert(alert), this.timeout)
            })
    }

    public removeAlert(alertToRemove: AlertModel) {
        this.alerts = this.alerts.filter((alert) => alert != alertToRemove)
    }

    public getClassAlert(alert: AlertModel) {
        if(!alert) return ''

        switch(alert.alertType) {
            case AlertType.DANGER:
                return 'alert alert-danger'
            case AlertType.WARNING:
                return 'alert alert-warning'
            case AlertType.SUCCESS: 
                return 'alert alert-success'
            case AlertType.INFO: 
                return 'alert alert-info'
        }
    }

}