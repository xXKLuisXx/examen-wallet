import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';
import { BalanceComponent } from '../balance/balance.component';
import { PaymentsComponent } from '../payments/payments.component';

@NgModule({
	imports: [
		CommonModule, 
		FormsModule, 
		IonicModule
	],
	declarations: [
		ExploreContainerComponent,
		BalanceComponent,
		PaymentsComponent
	],
	exports: [
		ExploreContainerComponent,
		BalanceComponent,
		PaymentsComponent
	],
	entryComponents: [
		ExploreContainerComponent,
		BalanceComponent,
		PaymentsComponent
	]
})
export class ExploreContainerComponentModule { }
