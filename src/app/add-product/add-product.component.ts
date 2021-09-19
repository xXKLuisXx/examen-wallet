import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Utils } from '../models/utils';
import { WalletService } from '../services/wallet.service';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

	constructor(
		private utils: Utils,
		private modalController: ModalController,
		public walletService: WalletService
	) { }

	ngOnInit() { }

	addProduct() {
		let payment = {
			service_id: 2
		}
		this.utils.loadingPresent().then(()=>{
			this.modalController.dismiss().then(() => {
				this.walletService.newPaymentByService(payment).then(()=>{
					this.utils.loadingDismiss();
				}).catch((error)=>{
					this.utils.loadingDismiss();
					console.error(error);
				});
			}).catch((error) => {
				console.error(error);
				this.utils.loadingDismiss();
			});
		}).catch((error)=>{
			console.error(error);
			
		});
	}
}
