# eu-tin-validator
Tax Identification Number (TIN) Validator for European Union (EU) Countries
todo: 
add supported countries

## install

```bash
# npm
npm install eu-tin-validator
```

## usage
```typescript
// TODO
```
### Run tests
`npm run test`

## limitage
For the following countries, syntax rules are not publicly available so it only check if length and pattern matches. You will never get 0 as the response
- **Czech Republic**
- **Greece**
- **Malta**

## disclaimer
Important disclaimer:

This repo confirms whether the structure of the TIN you enter is valid (types and number of characters).

It can also validate the syntax (i.e. algorithm/internal logic) only when the national authority has informed EU about the algorithm in https://ec.europa.eu/taxation_customs/tin/#/check-tin

Contrary to VAT number checks carried out on the VIES portal, it does NOT confirm the identity of a person nor whether the TIN you enter actually exists or has been allocated.

As any updates must be provided by the national authorities, we cannot guarantee that the information provided is up to date.

⚠ Please note that this repo can validate only the structure of TIN referring to a natural person. EU Countries may use for legal entity other format of TIN, and it cannot be validated with this module.