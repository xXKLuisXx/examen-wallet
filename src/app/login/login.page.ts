import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { User } from '../models/user';
import { Utils } from '../models/utils';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	/* VARIABLES DEL FORMULARIO */
	get email() {
		return this.LoginForm.get('email')
	}
	get password() {
		return this.LoginForm.get('password')
	}

	/* MENSAJES DE ERROR DURANTE LLENADO DE DATOS */
	public errorMessages = {
		email: [
			{ type: 'required', message: 'Debes añadir un correo' },
			{
				type: 'pattern',
				message: 'El texto ingresado no parece ser un correo electrónico',
			},
		],
		password: [
			{ type: 'required', message: 'Debes añadir una contraseña' },
			{
				type: 'maxlength',
				message: 'Tu contraseña no puede exceder los 50 carácteres',
			},
			{ type: 'minlength', message: 'Debes de ingresar al menos 8 carácteres' },
		],
	}

	/* REGLAS DEL FORMULARIO */
	LoginForm = this.formBuilder.group({
		email: [
			'',
			[
				Validators.required,
				Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
			],
		],
		password: [
			'',
			[Validators.required, Validators.maxLength(50), Validators.minLength(8)],
		],
	})

	/* CONSTRUCTOR */
	constructor(
		private router: Router,
		private UserData: User,
		private authService: AuthService,
		private utils: Utils,
		private formBuilder: FormBuilder
	) { }

	ngOnInit() { }

	/* FUNCIÓN SUBMIT Se activa para enviar los datos en el formulario */
	public submit() {
		this.utils.deleteAccessToken().finally();
		
		return new Promise((resolve, reject) => {
			this.utils.loadingPresent().then(() => {
				if (this.LoginForm.valid) {
					// Loading Mensaje
					
					this.UserData.email = this.LoginForm.get('email').value
					this.UserData.password = this.LoginForm.get('password').value
					
					this.authService.login(this.UserData).then((AccessUserData) => {
						AccessUserData = AccessUserData.slice(2);

						this.saveBearer(AccessUserData).then(() => {
							this.router.navigate(['/home/tabs/tab1']);
							this.utils.loadingDismiss()
						})
						.catch((error) => {
							this.utils.loadingDismiss()
							console.error(error)
						})
						
					}).catch((error) => {
						this.utils.loadingDismiss()
						console.error(error)
					});
					
				} else {
					//this.utils.alertPresent('Error al Iniciar Sesión', "Debes llenar todos los campos de manera correcta para continuar", 'OK');
					this.utils.loadingDismiss()
				}
			});
		});
	}

	setEmail(event) {
		let field = this.LoginForm.get('email');

		field.patchValue(event.detail.value)
		field.markAsDirty()
		field.markAsTouched()
		field.updateValueAndValidity()
	}

	setPassword(event) {
		let field = this.LoginForm.get('password');

		field.patchValue(event.detail.value)
		field.markAsDirty()
		field.markAsTouched()
		field.updateValueAndValidity()
	}

	saveUserData(profileData: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.utils
				.storeItem('ProfileData', profileData)
				.then((storeProfile) => {
					resolve(storeProfile)
				})
				.catch((error) => {
					console.error('Native Storage - ProfileData:', error)
					reject(error)
				})
		})
	}

	saveBearer(AccessUserData: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.utils.storeItem(
				'AccessDataUser', AccessUserData
			).then((storeAccessData) => {
				resolve(storeAccessData)
			}).catch((error) => {
				console.error('Native Storage - AccessDataUser:', error)
				reject(error)
			});
		});
	}

}
