var request = require('request-promise-native');

export interface ServiceEndpoint {
    id: string;
    type: string;
    serviceEndpoint: string;
    [key: string]: string;
}

export interface PublicKey {
    id: string;
    type: string[];
    publicKeyHex?: string
    publicKeyBase58?: string
    publicKeyBase64?: string
    ethereumAddress?: string
    publicKeyPem?: string
}

export interface VerificationMethod {
    id: string;
    type: string;
    controller: string;
    publicKeyHex?: string
    publicKeyBase58?: string
    publicKeyBase64?: string
    ethereumAddress?: string
    publicKeyPem?: string
}

export interface EvanDIDDocument {
    '@context': string|string[];
    id: string;
    alsoKnownAs?: string[];
    publicKey: PublicKey[]; // Deprecated, kept for backwards compatibility
    verificationMethod: VerificationMethod[];
    authentication?: (string|VerificationMethod)[];
    assertionMethod?: (string|VerificationMethod)[];
    keyAgreement?: (string|VerificationMethod)[];
    capabilityInvocation?: (string|VerificationMethod)[];
    capabilityDelegation?: (string|VerificationMethod)[];
    service?: ServiceEndpoint[];
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
