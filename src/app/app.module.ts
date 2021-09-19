import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AlertController, IonicModule, IonicRouteStrategy, LoadingController } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Utils } from './models/utils';
import { User } from './models/user';
import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
	declarations: [
		AppComponent
	],
	entryComponents: [],
	imports: [
		BrowserModule, 
		IonicModule.forRoot(), 
		AppRoutingModule
	],
	providers: [
		Utils,
		User,
		LoadingController,
		AlertController,
		NativeStorage,
		HTTP,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
