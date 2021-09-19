export class Wallet {
    id: number
    balance: number
    token: string

    constructor(){
        this.balance = 0;
        this.id = 0;
        this.token = ""
    }
}
