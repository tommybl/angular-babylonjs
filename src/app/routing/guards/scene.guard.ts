import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as menuData from '../../../assets/menu.json';

@Injectable({
    providedIn: 'root'
})
export class SceneGuard implements CanActivate {

    menu!: any;

    constructor(private router: Router) {
        this.menu = (menuData as any).default;
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
        const sector = route.paramMap.get('sector');
        const scene = route.paramMap.get('scene');
        const redirectTree = this.router.parseUrl('/');
        if (sector && scene && this.menu?.[sector]?.scenes?.length) {
            return this.menu[sector].scenes.some((item: any) => item.alias === scene) ? true : redirectTree;
        }
        return redirectTree;
    }
}
