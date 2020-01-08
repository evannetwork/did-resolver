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
export declare class EvanDIDResolver {
    private readonly smartAgentUrl;
    constructor(apiUrl: String);
    resolveDid(did: String): Promise<EvanDIDDocument>;
}
