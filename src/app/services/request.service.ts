import { Injectable } from '@angular/core';
import { AccessUserData } from '../models/access-user-data';
import { RequestResponse } from '../models/request-response';
import { Utils } from '../models/utils';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
	providedIn: 'root'
})
export class RequestService {
	//private AUTH_SERVER_ADDRESS = 'http://127.0.0.1:8000/api/';
	//private AUTH_SERVER_ADDRESS = 'http://18.119.70.56/api/';
	//private AUTH_SERVER_ADDRESS = 'http://192.168.100.249:8000/api/';
	private AUTH_SERVER_ADDRESS = 'http://192.168.100.21:8000/api/';
	// private AUTH_SERVER_ADDRESS = 'http://127.0.0.1:8000/api/';
	//private AUTH_SERVER_ADDRESS = 'http://192.168.0.4:8000/api/';

	private HEADERS = { 'Accept': 'application/json', 'Authorization': '', 'Access-Control-Allow-Origin': '*' };

	private END_POINTS = [
		['login', '0'],
		['','']
	];
	constructor(
		private http: HTTP,
		private utils: Utils
	) { }

	private selectEnpoint(endPoint: string): Array<string> {
		switch (endPoint) {
			case 'login':
				return this.END_POINTS[0];
			default:
				break;
		}
		return null
	}

	private createHeaders(endPoint: string): Promise<any> {
		return new Promise((resolve, reject) => {
			let endPointArray = this.selectEnpoint(endPoint);
			if (endPointArray[1] == '1') {
				this.utils.getAccessData().then((AccessUserData: AccessUserData) => {
					this.HEADERS.Authorization = AccessUserData.getAuthorization();
					resolve(this.HEADERS);
				}).catch((error) => {
					reject(error);
				});
			} else {
				resolve(this.HEADERS);
			}

		});
	}

	private parseObjectToQueryParams(queryParams: any): string {
		let queryParamsBuild = "";
		if (queryParams) {
			Object.keys(queryParams).forEach((key, index) => {
				if (index == 0) {
					queryParamsBuild = "?"
				} else {
					queryParamsBuild += "&"
				}
				queryParamsBuild += key + "=" + queryParams[key];
			});
			return queryParamsBuild;
		}
		return queryParamsBuild;
	}

	private createEndpoint(endPoint: string, params?: any, secondEndPoint?: string, queryParams?: any): Promise<string> {
		return new Promise((resolve) => {
			let endPointBody;
			if (secondEndPoint) {
				if ((params["id2"]) != undefined) {
					endPointBody = (this.AUTH_SERVER_ADDRESS + this.selectEnpoint(endPoint)[0] + '/' + params["id"] + '/' + secondEndPoint + '/' + params["id2"]) + this.parseObjectToQueryParams(queryParams);
				}
				else {
					endPointBody = (this.AUTH_SERVER_ADDRESS + this.selectEnpoint(endPoint)[0] + '/' + params["id"] + '/' + secondEndPoint) + this.parseObjectToQueryParams(queryParams);
				}
				resolve(endPointBody);
			}
			else if (params) {
				if (params["id"]) {
					endPointBody = (this.AUTH_SERVER_ADDRESS + this.selectEnpoint(endPoint)[0] + '/' + params["id"] + this.parseObjectToQueryParams(queryParams));
				}
				else {
					endPointBody = (this.AUTH_SERVER_ADDRESS + this.selectEnpoint(endPoint)[0] + '/' + '0' + this.parseObjectToQueryParams(queryParams));
				}
				resolve(endPointBody);
			}
			else {
				endPointBody = (this.AUTH_SERVER_ADDRESS + this.selectEnpoint(endPoint)[0] + this.parseObjectToQueryParams(queryParams));
				resolve(endPointBody);
			}
		});
	}

	public createRequestPost(endPoint: string, object?: any, params?: any, secondEndPoint?: string, queryParams?: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.createHeaders(endPoint).then((headers) => {
				this.http.setDataSerializer('json');
				this.createEndpoint(endPoint, params, secondEndPoint, queryParams).then((endPointBody: string) => {
					console.log(endPointBody, object, headers);
					this.http.post(endPointBody, object, headers).then((data) => {
						console.log(data);
						resolve(data.data);
					}).catch((error) => {
						this.utils.checkErrors(error).then((requestResponse) => {
							this.utils.alertPresent('Errors', requestResponse, 'OK');
							reject(error);
						}).catch((error) => {
							reject(error);
						});
					});
				}).catch((error) => {
					reject(error);
				});
			}).catch((error) => {
				reject(error);
			});
		});
	}

	public createRequestGet(endPoint: string, queryParams?: any, params?: any, secondEndPoint?: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.createHeaders(endPoint).then((headers) => {
				this.http.setDataSerializer('json');
				this.createEndpoint(endPoint, params, secondEndPoint).then((endPointBody: string) => {
					this.http.get(endPointBody, queryParams, headers).then((data) => {
						resolve(data.data);
					}).catch((error) => {
						console.error(error);
						this.utils.checkErrors(error).then((requestResponse) => {
							this.utils.alertPresent('Errors', requestResponse, 'OK');
							reject(error);
						}).catch((error) => {
							reject(error);
						});
					});
				}).catch((error) => {
					reject(error);
				});
			}).catch((error) => {
				reject(error);
			});
		});
	}

	public createRequestPut(endPoint: string, object?: any, params?: any, secondEndPoint?: string, queryParams?: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.createHeaders(endPoint).then((headers) => {
				this.http.setDataSerializer('json');
				this.createEndpoint(endPoint, params, secondEndPoint, queryParams).then((endPointBody: string) => {
					this.http.put(endPointBody, object, headers).then((data) => {
						resolve(data.data);
					}).catch((error) => {
						this.utils.checkErrors(error).then((requestResponse) => {
							this.utils.alertPresent('Errors', requestResponse, 'OK');
							reject(error);
						}).catch((error) => {
							reject(error);
						});
					});
				});
			}).catch((error) => {
				reject(error);
			});
		});
	}

	public createRequestDelete(endPoint: string, object?: any, params?: any, secondEndPoint?: string, queryParams?: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.createHeaders(endPoint).then((headers) => {
				this.http.setDataSerializer('json');
				this.createEndpoint(endPoint, params, secondEndPoint, queryParams).then((endPointBody) => {
					this.http.delete(endPointBody, (object != null) ? object.queryParams : undefined, headers).then((data) => {
						resolve(data.data);
					}).catch((error) => {
						this.utils.checkErrors(error).then((requestResponse: RequestResponse) => {
							this.utils.alertPresent('Errors', requestResponse, 'OK');
							reject(error);
						}).catch((error) => {
							reject(error);
						});
					});
				}).catch((error) => {
					reject(error);
				});
			}).catch((error) => {
				reject(error);
			});
		});
	}
}
