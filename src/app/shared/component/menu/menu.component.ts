import { Component, OnInit } from "@angular/core";
import { ActivatedRoute  } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{

    public show: boolean = false

    constructor() {}

    ngOnInit() {
    }

    public toggle() {
        this.show = !this.show
    }
}