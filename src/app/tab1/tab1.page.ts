import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from '../models/utils';
import { AuthService } from '../services/auth.service';
import { WalletService } from '../services/wallet.service';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	constructor(
		public wallet: WalletService,
		public authService: AuthService,
		public utils: Utils,
		public router: Router
	) {
	}

	logout() {
		console.log("entra");
		this.utils.loadingPresent().then(()=>{
			this.authService.logout().then(()=>{
				this.router.navigate(["/"]);
				this.utils.loadingDismiss();
			})
		}).catch((error)=>{
			console.error(error);
			this.utils.loadingDismiss();
		});
	}
}
