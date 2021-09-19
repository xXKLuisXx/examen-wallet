import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { RequestService } from './request.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private request: RequestService) {

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
}
