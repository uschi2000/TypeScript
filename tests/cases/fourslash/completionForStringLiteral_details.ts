/// <reference path="fourslash.ts" />

// @Filename: /other.ts
////export const x = 0;

// @Filename: /a.ts
////import {} from ".//*path*/";
////
////const x: "a" = "/*type*/";
////
////interface I {
////    /** Prop doc */
////    x: number;
////    /** Method doc */
////    m(): void;
////}
////declare const o: I;
////o["/*prop*/"];

verify.completions({ marker: "path", includes: { name: "other", text: "other", kind: "script" }, isNewIdentifierLocation: true });

goTo.marker("type");
verify.completionListContains("a", "a", "", "string");

goTo.marker("prop");
verify.completionListContains("x", "(property) I.x: number", "Prop doc ", "property");
verify.completionListContains("m", "(method) I.m(): void", "Method doc ", "method");
