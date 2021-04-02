import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-drawers',
    templateUrl: './drawers.component.html',
    styleUrls: ['./drawers.component.scss']
})
export class DrawersComponent implements OnInit {

    @Input() hotspotKey!: string;

    constructor() {
    }

    ngOnInit(): void {
    }
}
