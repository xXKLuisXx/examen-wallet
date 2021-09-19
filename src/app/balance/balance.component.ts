import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddProductComponent } from '../add-product/add-product.component';
import { WalletService } from '../services/wallet.service';

@Component({
	selector: 'app-balance',
	templateUrl: './balance.component.html',
	styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {

	selected:boolean;
	constructor(
		public walletService: WalletService,
		private router: Router,
		private modalcontroller: ModalController
	) {
		console.log(this.walletService.wallet.balance);

	}

	ngOnInit() { }

	goToRecharge() { // redirige al recharge menu
		this.router.navigate(['/home/tabs/tab3']);
		console.log("recharge");
	}
	addProduct() { // abre un modal
		console.log("product");

		this.modalcontroller.create({
			component: AddProductComponent
		}).then((modal) => {
			modal.present();
		})
	}
	launchMarketing(event) { // manda una solicitud al servidor
		console.log("market", this.selected);
		let payment = {
			isActive: this.selected,
			service_id:3
		}

		this.walletService.newPaymentByService(payment).then((data)=>{
			console.log(data);
		}).catch((error)=>{
			console.error(error);
			
		});
	}

}
