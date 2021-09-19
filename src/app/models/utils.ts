import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, AlertController, NavController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
//import { Conversation } from './Chat/conversation';
import { RequestResponse } from './request-response';
import { AccessUserData } from './access-user-data';

@Injectable({
    providedIn: 'root'
})

export class Utils {
    private loading: HTMLIonLoadingElement;
    private alert: HTMLIonAlertElement;
    private toast;

    constructor(
        private loadingController: LoadingController,
        private alertController: AlertController,
        private nativeStorage: NativeStorage,
        private navCtrl: NavController,
        private toastController: ToastController,
        //private secureStorage: SecureStorage
    ) { }

    
    public buildAccessData(Response: any): AccessUserData {
        let accessdata = Response;
        let accessUserData = new AccessUserData();
        Object.keys(accessdata).forEach(keyR => {
            Object.keys(accessUserData).forEach(keyAD => {
                if (keyR == keyAD) {
                    accessUserData[keyAD] = Response[keyR];
                }
            })
        });
        return accessUserData;
    }

    public checkErrors(error): Promise<RequestResponse> {
        return new Promise((resolve, reject) => {
            let requestResponse = new RequestResponse(error);
            requestResponse.buildErrors().then((messageHTML) => {
                requestResponse.messageHTML = messageHTML;
                resolve(requestResponse);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public createLoading(): Promise<HTMLIonLoadingElement> {
        return new Promise((resolve, reject) => {
            this.loadingController.create({
                cssClass: 'loading-controller-class',
                message: 'Por Favor, Espere...'
            }).then((loading) => {
                resolve(loading);
            }).catch((error) => {
                reject(error);
            });
        });

    }

    public getItem(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem(key).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            })
        });
    }

    /*
    public getSecureItem(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.secureStorage.create('private_storage')
                .then((storage) => {
                    storage.get(key)
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    */

    public deleteItem(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.nativeStorage.remove(key).then(() => {
                resolve(true);
            }).catch((error) => {
                reject(error);
            })
        });
    }

    /*
    public deleteSecureItem(key: string) {
        return new Promise((resolve, reject) => {
            this.secureStorage.create('private_storage')
                .then((storage) => {
                    storage.remove(key)
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    */

    public storeItem(key: string, data: any) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.setItem(key, data).then(() => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    /*
    public storeSecureItem(key: string, data: any):Promise<any> {
        return new Promise((resolve, reject) => {
            this.secureStorage.create('private_storage')
                .then((storage) => {
                    storage.set(key, data)
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    */

    public getAccessData() {
        return new Promise((resolve, reject) => {
            this.getItem('AccessDataUser').then((data: string) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public createAlert(header: string, responseRequest: RequestResponse, buttonText: string): Promise<HTMLIonAlertElement> {
        return new Promise<HTMLIonAlertElement>((resolve, reject) => {
            this.alertController.create({
                header: header,
                cssClass: "relationConfrmation",
                message: responseRequest.messageHTML,
                buttons: [
                    {
                        text: buttonText,
                        handler: () => {
                            if (responseRequest.status == 401) {
                                this.deleteAccessToken().finally(() => {
                                    this.navCtrl.navigateRoot('starting-page');
                                    window.location.reload();
                                });
                            }
                        }
                    }
                ]
            }).then((alert)=>{
                resolve(alert);
            }).catch((error)=>{
                reject(error);
            });
        });
        
    }

    public alertPresent(header: string, requestResponse: RequestResponse, buttonText: string) {
        return new Promise((resolve, reject) => {
            this.createAlert(header, requestResponse, buttonText).then((Result) => {
                this.alertDismiss().finally(()=>{
                    this.alert = Result;
                    this.alert.present().finally(()=>{
                        resolve(true);
                    });
                });
            }).catch((error)=>{
                reject(error);
            });
        })
    }

    public alertDismiss() {
        return new Promise((resolve, reject) => {
            this.alert.dismiss().then(()=>{
                this.alert = undefined;
                resolve(true);
            }).catch((error)=>{
                reject(error);
            });
        });
    }

    public loadingPresent() {
        return new Promise((resolve, reject) => {
            this.createLoading().then((Result) => {
                this.loading = Result;
                this.loading.present().then(() => {
                    resolve(this.loading);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });

    }

    public loadingDismiss() {
        return new Promise((resolve, reject) => {
            this.loading.dismiss().then(() => {
                resolve(true);
            }).catch((error) => {
                reject(error);
            })
        });
    }

    public deleteAccessToken() {
        return new Promise((resolve, reject) => {
            this.deleteItem('AccessDataUser').then(() => {
                this.nativeStorage.clear().then(() => {
                    resolve("Borrado");
                }).catch((error) => {
                    reject(error);
                })
            }).catch((error) => {
                reject(error);
            });
        });
    }

    presentToast(mensaje: string) {
        try {
            this.toast.dismiss();
        } catch (e) { }

        this.toastController.create({
            message: mensaje,
            duration: 2000
        }).then((toast)=>{
            this.toast = toast;
            this.toast.present();
        });
        
    }
}
