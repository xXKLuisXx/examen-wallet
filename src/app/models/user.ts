export class User {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    device_name:string

    constructor() {
        this.username = "";
        this.email = "";
        this.password = "";
        this.password_confirmation = "";
        this.device_name = "Ejemplo"
    }
}
