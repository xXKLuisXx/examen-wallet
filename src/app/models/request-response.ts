export class RequestResponse {
    headers: string;
    status: number;
    response: {
        redirectErrors: any,
        clientErrors: any,
        serverErrors: any
    }
    messageHTML: string
    constructor(serverResponse?: any) {
        this.headers = "";
        this.status = 0;
        this.response = {
            redirectErrors: new Object(),
            clientErrors: new Object(),
            serverErrors: new Object(),
        }
        if (serverResponse != null && serverResponse != undefined) {
            this.status = (serverResponse.status != null) ? serverResponse.status : 0;
            this.headers = (serverResponse.headers != null) ? serverResponse.headers : "";
            if (serverResponse.error != null) {
                let errorParsed;
                try {
                    errorParsed = JSON.parse(serverResponse.error);
                    if (this.status >= 300 && this.status < 400) {
                        this.response.redirectErrors = {
                            redirect: ["Posiblemente la ruta no este disponible"]
                        }
                    } else if (this.status >= 400 && this.status < 500) {
                        if (errorParsed.error == "invalid_grant") {
                            this.response.clientErrors = {
                                credentials: ["El correo electrónico, o la contraseña no son válidos"]
                            }
                        } else {
                            this.response.clientErrors = errorParsed;
                        }
                    } else if (this.status >= 500 && this.status < 600) {
                        this.response.serverErrors = {
                            redirect: ["El servidor no respondió la solicitud"]
                        }
                    } else {
    
                    }
                }catch(error){
                    if((serverResponse.status == null || serverResponse.status == undefined) && (serverResponse.error != null && serverResponse.error != undefined)){
                        this.response.clientErrors = 'CORS ERROR: ' + serverResponse.error;
                    }else{
                        this.response.clientErrors = 'Error status: ' + serverResponse.status;   
                    }                
                }
            } else {
            }
        }
    }

    public buildErrors(): Promise<string> {
        return new Promise((resolve, reject) => {
            let HTML = '<ul>';
            if(typeof(this.response) === 'object' && Object.keys(this.response).length > 0){
                Object.keys(this.response).forEach((serverErrorKey) => {
                    if (typeof(this.response[serverErrorKey]) === 'object' && Object.keys(this.response[serverErrorKey]).length > 0) {
                        Object.keys(this.response[serverErrorKey]).forEach((errorKey) => {
                            console.log("Errors in principal errors", this.response[serverErrorKey][errorKey]);
                            if (typeof(this.response[serverErrorKey][errorKey]) === 'object' && Object.keys(this.response[serverErrorKey][errorKey]).length > 0) {
                                Object.keys(this.response[serverErrorKey][errorKey]).forEach((key) => {
                                    HTML += '<li>' + this.response[serverErrorKey][errorKey][key] + '</li>';
                                });
                            } else {
                                if(this.response[serverErrorKey][errorKey] != null && Object.keys(this.response[serverErrorKey][errorKey]).length > 0){
                                    HTML += '<li>' + this.response[serverErrorKey][errorKey] +'</li>';
                                }else {
                                    //console.log("llave error sin resultados");
                                }
                            }
                        });
                    } else {
                        if(this.response[serverErrorKey] != null && Object.keys(this.response[serverErrorKey]).length > 0){
                            HTML += '<li>' + this.response[serverErrorKey] + '</li>';
                        }else{
                            //console.log("llave error sin resultados");
                        }
                    }
                });
            }else{
                if(this.response != null && Object.keys(this.response).length > 0){
                    HTML += '<li>' + this.response + '</li>';
                }else{
                    reject("llave error sin resultados");
                }
            }
            resolve(HTML + '</li>');
        });
    }
}
