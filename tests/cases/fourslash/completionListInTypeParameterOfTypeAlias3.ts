/// <reference path='fourslash.ts'/>

//// type constructorType<T1, T2> = new <T/*1*/, /*2*/

verify.completions({ marker: test.markerNames(), excludes: ["T", "T1", "T2"] });
