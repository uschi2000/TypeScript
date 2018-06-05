/// <reference path="fourslash.ts"/>

//// if(0 === ''.

goTo.eof();
// TODO: GH#24690
verify.completions({ includes: "charAt", isNewIdentifierLocation: true });
