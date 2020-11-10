# Evan DID Resolver

This package can be used to query the evan.network DID resolver API.

```typescript
const{
    EvanDIDDocument,
    EvanDIDResolver
 } = require('@evan.network/did-resolver')

const resolver = new EvanDIDResolver("https://evan.network/did/api");
const did = "did:evan:0x126E901F6F408f5E260d95c62E7c73D9B60fd734";
try {
    const didDocument: EvanDIDDocument = resolver.resolveDid(did);
    console.log(didDocument);
} catch(e) {
    console.error(e);
}
```
