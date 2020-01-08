var request = require('request-promise-native');

export interface EvanDIDDocument {
    '@context': string;
    id: string;
    publicKey: {
        id: string;
        type: string[];
        publicKeyHex: string;
    }[];
    authentication: {
        type: string;
        publicKey: string;
    } | {
        type: string;
        publicKey: string;
    }[];
    service?: {
        id: string;
        type: string;
        serviceEndpoint: string;
    }[];
}

export class EvanDIDResolver {

    private readonly smartAgentUrl: String;

    constructor(apiUrl: String){
        this.smartAgentUrl = apiUrl;
    }

    public async resolveDid(did: String): Promise<EvanDIDDocument> {
        return new Promise((resolve, reject) => {
            const url = this.smartAgentUrl.replace(/\/$/, "") + `/${did}`;
            let didDoc: EvanDIDDocument;
            console.log(url);
            request.get(url)
            .then(function(response) {
                try {
                    didDoc = JSON.parse(response).did;
                } catch (e) {
                    reject(e);
                }
                resolve(didDoc);
            })
            .catch(function(e) {
                reject(e);
            });
        });
    }
}
