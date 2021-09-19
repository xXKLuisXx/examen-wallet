import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { Service } from '../models/service';
import { Wallet } from '../models/wallet';
import { RequestService } from './request.service';

@Injectable({
	providedIn: 'root'
})
export class WalletService {

	public wallet: Wallet;
	public payments: Array<Payment> = new Array<Payment>();
	public services: Array<Service> = new Array<Service>();
	constructor(private request: RequestService) {
		this.getWalletData().then((data:string)=>{
			this.wallet = JSON.parse(data);
			console.log(this.wallet);
		}).catch((error)=>{
			console.error(error);
		});

		this.getPaymentsData().then((data: string)=>{
			console.log(JSON.parse(data));
			JSON.parse(data).forEach(element => {
				this.payments.push(element);
			});
		}).catch((error)=>{
			console.error(error);
		});

		this.getServicesData().then((data: string)=>{
			console.log(JSON.parse(data));
			JSON.parse(data).forEach(element => {
				this.services.push(element);
			});
		}).catch((error)=>{
			console.error(error);
		});

	}


	getWalletData() {
		return new Promise((resolve, reject) => {
			this.request.createRequestGet('wallet').then((data:string) => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	getPaymentsData() {
		return new Promise((resolve, reject) => {
			this.request.createRequestGet('payments').then((data) => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	getServicesData() {
		return new Promise((resolve, reject) => {
			this.request.createRequestGet('services').then((data) => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	newPaymentByService(payment){
		return new Promise((resolve, reject) => {
			this.request.createRequestPost('payment', payment).then((data) => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	}
}
