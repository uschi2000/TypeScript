/// <reference path='fourslash.ts'/>

////function fnc1() {
////    var bar = 1;
////    function foob(){ }
////}
////
////fnc1./**/

verify.completions({
    marker: "",
    exact: ["apply", "call", "bind", "toString", "prototype", "length", { name: "arguments", text: "(property) Function.arguments: any" }, "caller"],
});
