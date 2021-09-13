import request from 'request-promise-native';
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
export interface EvanSidetreeDidDocument {
    "@context": any[];
    id: string;
    publicKey: {
      id: string;
      controller: string;
      type: string;
      publicKeyJwk: any[];
    }[];
    authentication: string[];
    assertionMethod: string[];
    capabilityInvocation: string[];
    capabilityDelegation: string[];
    keyAgreement: string[];
    service: {
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

    public async resolveDid(did: String): Promise<EvanDIDDocument | EvanSidetreeDidDocument> {
        return new Promise((resolve, reject) => {
            const url = this.smartAgentUrl.replace(/\/$/, "") + `/${did}`;
            let didDoc: EvanDIDDocument | EvanSidetreeDidDocument;
            console.log(url);
            request.get(url)
            .then(function(response) {
                try {
                    const res = JSON.parse(response);
                    didDoc = res.did ?? res.didDocument;

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
