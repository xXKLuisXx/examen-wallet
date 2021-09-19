import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';
import { BalanceComponent } from '../balance/balance.component';
import { PaymentsComponent } from '../payments/payments.component';
import { RechargeComponent } from '../recharge/recharge.component';

@NgModule({
	imports: [
		CommonModule, 
		FormsModule, 
		IonicModule
	],
	declarations: [
		ExploreContainerComponent,
		BalanceComponent,
		PaymentsComponent,
		RechargeComponent
	],
	exports: [
		ExploreContainerComponent,
		BalanceComponent,
		PaymentsComponent,
		RechargeComponent
	],
	entryComponents: [
		ExploreContainerComponent,
		BalanceComponent,
		PaymentsComponent,
		RechargeComponent
	]
})
export class ExploreContainerComponentModule { }
