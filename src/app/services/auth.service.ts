import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Utils } from '../models/utils';
import { RequestService } from './request.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private request: RequestService,
		private utils: Utils
	) {

	}

	public login(user: User): Promise<any> {
		return new Promise((resolve, reject) => {
			this.request.createRequestPost('login', user).then((data) => {
				console.log(data);
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});

	}

	public logout(): Promise<any>{
		return new Promise((resolve, reject)=>{
			this.utils.deleteAccessToken().then(()=>{
				resolve(true);
			}).catch((error)=>{
				console.error(error);
				reject(error);
			});
		});
	}
}
