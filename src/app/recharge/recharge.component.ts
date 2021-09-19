import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Utils } from '../models/utils';
import { WalletService } from '../services/wallet.service';

@Component({
	selector: 'app-recharge',
	templateUrl: './recharge.component.html',
	styleUrls: ['./recharge.component.scss'],
})
export class RechargeComponent implements OnInit {

	amount: number
	constructor(
		private utils: Utils,
		private modalController: ModalController,
		public walletService: WalletService
	) { }

	ngOnInit() { }

	recharge() {
		let payment = {
			amount: this.amount,
			service_id: 1
		}
		this.utils.loadingPresent().then(() => {
			this.walletService.newPaymentByService(payment).then((data) => {
				console.log(data);
				this.utils.loadingDismiss();
			}).catch((error) => {
				this.utils.loadingDismiss();
				console.error(error);
			});
		}).catch((error) => {
			console.error(error);

		});
	}

	setAmount(event){
		this.amount = event.detail.value;
	}
}
