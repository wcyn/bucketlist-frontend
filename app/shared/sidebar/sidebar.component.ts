import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { tokenNotExpired } from "angular2-jwt";

declare let $:any;
@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        $.getScript('../../assets/js/sidebar-moving-tab.js');
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    loggedIn() {
        return tokenNotExpired();
    }
    
}
