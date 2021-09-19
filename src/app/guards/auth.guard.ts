import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Utils } from '../models/utils';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private utils: Utils,
		private router: Router
	) { }
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
		return new Promise((resolve) => {
			this.utils.getAccessData().then((data) => {
				console.log("2: " + data);
				resolve(this.router.parseUrl("/home/tabs/tab1"));
			}).catch(() => {
				resolve(true);
			});
		});
	}

}
