export class AccessUserData {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
    constructor(token_type?: string, expires_in?: number, access_token?:string, refresh_token?: string ){
        if(token_type != null && expires_in != null && access_token != null && refresh_token != null){
            this.token_type = token_type;
            this.expires_in = expires_in;
            this.access_token = access_token;
            this.refresh_token = refresh_token;
        }else{
            this.token_type = "";
            this.expires_in = 0;
            this.access_token = "";
            this.refresh_token = "";
        }
    }

    public getAuthorization():string{
        return this.token_type + " " + this.access_token;
    }
}
