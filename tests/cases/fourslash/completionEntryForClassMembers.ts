///<reference path="fourslash.ts" />

// @noLib: true

////abstract class B {
////    private privateMethod() { }
////    protected protectedMethod() { };
////    static staticMethod() { }
////    abstract getValue(): number;
////    /*abstractClass*/
////}
////class C extends B {
////    /*classThatIsEmptyAndExtendingAnotherClass*/
////}
////class D extends B {
////    /*classThatHasAlreadyImplementedAnotherClassMethod*/
////    getValue() {
////        return 10;
////    }
////    /*classThatHasAlreadyImplementedAnotherClassMethodAfterMethod*/
////}
////class D1 extends B {
////    /*classThatHasDifferentMethodThanBase*/
////    getValue1() {
////        return 10;
////    }
////    /*classThatHasDifferentMethodThanBaseAfterMethod*/
////}
////class D2 extends B {
////    /*classThatHasAlreadyImplementedAnotherClassProtectedMethod*/
////    protectedMethod() {
////    }
////    /*classThatHasDifferentMethodThanBaseAfterProtectedMethod*/
////}
////class D3 extends D1 {
////    /*classThatExtendsClassExtendingAnotherClass*/
////}
////class D4 extends D1 {
////    static /*classThatExtendsClassExtendingAnotherClassAndTypesStatic*/
////}
////class D5 extends D2 {
////    /*classThatExtendsClassExtendingAnotherClassWithOverridingMember*/
////}
////class D6 extends D2 {
////    static /*classThatExtendsClassExtendingAnotherClassWithOverridingMemberAndTypesStatic*/
////}
////class E {
////    /*classThatDoesNotExtendAnotherClass*/
////}
////class F extends B {
////    public /*classThatHasWrittenPublicKeyword*/
////}
////class F2 extends B {
////    private /*classThatHasWrittenPrivateKeyword*/
////}
////class G extends B {
////    static /*classElementContainingStatic*/
////}
////class G2 extends B {
////    private static /*classElementContainingPrivateStatic*/
////}
////class H extends B {
////    prop/*classThatStartedWritingIdentifier*/
////}
//////Class for location verification
////class I extends B {
////    prop0: number
////    /*propDeclarationWithoutSemicolon*/
////    prop: number;
////    /*propDeclarationWithSemicolon*/
////    prop1 = 10;
////    /*propAssignmentWithSemicolon*/
////    prop2 = 10
////    /*propAssignmentWithoutSemicolon*/
////    method(): number
////    /*methodSignatureWithoutSemicolon*/
////    method2(): number;
////    /*methodSignatureWithSemicolon*/
////    method3() {
////        /*InsideMethod*/
////    }
////    /*methodImplementation*/
////    get c()
////    /*accessorSignatureWithoutSemicolon*/
////    set c()
////    {
////    }
////    /*accessorSignatureImplementation*/
////}
////class J extends B {
////    get /*classThatHasWrittenGetKeyword*/
////}
////class K extends B {
////    set /*classThatHasWrittenSetKeyword*/
////}
////class J extends B {
////    get identi/*classThatStartedWritingIdentifierOfGetAccessor*/
////}
////class K extends B {
////    set identi/*classThatStartedWritingIdentifierOfSetAccessor*/
////}
////class L extends B {
////    public identi/*classThatStartedWritingIdentifierAfterModifier*/
////}
////class L2 extends B {
////    private identi/*classThatStartedWritingIdentifierAfterPrivateModifier*/
////}
////class M extends B {
////    static identi/*classThatStartedWritingIdentifierAfterStaticModifier*/
////}
////class M extends B {
////    private static identi/*classThatStartedWritingIdentifierAfterPrivateStaticModifier*/
////}
////class N extends B {
////    async /*classThatHasWrittenAsyncKeyword*/
////}
////class O extends B {
////    constructor(public a) {
////    },
////    /*classElementAfterConstructorSeparatedByComma*/
////}

const getValue: FourSlashInterface.ExpectedCompletionEntry = { name: "getValue", text: "(method) B.getValue(): number" };
const getValue1: FourSlashInterface.ExpectedCompletionEntry = { name: "getValue1", text: "(method) D1.getValue1(): number" };
const protectedMethod: FourSlashInterface.ExpectedCompletionEntry = { name: "protectedMethod", text: "(method) B.protectedMethod(): void" };
const protectedMethodD2: FourSlashInterface.ExpectedCompletionEntry = { name: "protectedMethod", text: "(method) D2.protectedMethod(): void" };
const privateMethod: FourSlashInterface.ExpectedCompletionEntry = { name: "privateMethod", text: "(method) B.privateMethod(): void" };
const staticMethod: FourSlashInterface.ExpectedCompletionEntry = { name: "staticMethod", text: "(method) B.staticMethod(): void" };
const allMembers: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [getValue, getValue1, protectedMethod, privateMethod, staticMethod];
const allMemberNames: ReadonlyArray<string> = ["getValue", "getValue1", "protectedMethod", "privateMethod", "staticMethod"];

function includeExclude(...included: string[]): Pick<FourSlashInterface.CompletionsOptions, "includes" | "excludes"> {
    ts.Debug.assert(included.every(i => allMemberNames.includes(i)));
    return {
        includes: allMembers.filter(m => included.includes(typeof m === "string" ? m : m.name)),
        excludes: allMemberNames.filter(m => !included.includes(m)),
    }
}

verify.completions(
    {
        // Not a class element declaration location
        marker: "InsideMethod",
        excludes: allMemberNames,
    },
    {
        // Only keywords allowed at this position since they dont extend the class or are private
        marker: [
            "abstractClass",
            "classThatDoesNotExtendAnotherClass",
            "classThatHasWrittenPrivateKeyword",
            "classElementContainingPrivateStatic",
            "classThatStartedWritingIdentifierAfterPrivateModifier",
            "classThatStartedWritingIdentifierAfterPrivateStaticModifier",
        ],
        exact: ["private", "protected", "public", "static", "abstract", "async", "constructor", "get", "readonly", "set"],
        isNewIdentifierLocation: true,
    },
    {
        // Instance base members and class member keywords allowed
        marker:[
            "classThatIsEmptyAndExtendingAnotherClass",
            "classThatHasDifferentMethodThanBase",
            "classThatHasDifferentMethodThanBaseAfterMethod",
            "classThatHasWrittenPublicKeyword",
            "classThatStartedWritingIdentifier",
            "propDeclarationWithoutSemicolon",
            "propDeclarationWithSemicolon",
            "propAssignmentWithSemicolon",
            "propAssignmentWithoutSemicolon",
            "methodSignatureWithoutSemicolon",
            "methodSignatureWithSemicolon",
            "methodImplementation",
            "accessorSignatureWithoutSemicolon",
            "accessorSignatureImplementation",
            "classThatHasWrittenGetKeyword",
            "classThatHasWrittenSetKeyword",
            "classThatStartedWritingIdentifierOfGetAccessor",
            "classThatStartedWritingIdentifierOfSetAccessor",
            "classThatStartedWritingIdentifierAfterModifier",
            "classThatHasWrittenAsyncKeyword",
            "classElementAfterConstructorSeparatedByComma",
        ],
        ...includeExclude("getValue", "protectedMethod"),
        isNewIdentifierLocation: true,
    },
    {
        // Static Base members and class member keywords allowed
        marker: ["classElementContainingStatic", "classThatStartedWritingIdentifierAfterStaticModifier"],
        ...includeExclude("staticMethod"),
        isNewIdentifierLocation: true,
    },
    {
        marker: [
            "classThatHasAlreadyImplementedAnotherClassMethod",
            "classThatHasAlreadyImplementedAnotherClassMethodAfterMethod",
        ],
        ...includeExclude("protectedMethod"),
        isNewIdentifierLocation: true,
    },
    {
        marker: [
            "classThatHasAlreadyImplementedAnotherClassProtectedMethod",
            "classThatHasDifferentMethodThanBaseAfterProtectedMethod",
        ],
        ...includeExclude("getValue"),
        isNewIdentifierLocation: true,
    },
    {
        // instance memebers in D1 and base class are shown
        marker: "classThatExtendsClassExtendingAnotherClass",
        ...includeExclude("getValue", "protectedMethod", "getValue1"),
        isNewIdentifierLocation: true,
    },
    {
        // instance memebers in D2 and base class are shown
        TODO: DO THIS BETTER
        marker: "classThatExtendsClassExtendingAnotherClassWithOverridingMember",
        includes: [getValue, protectedMethodD2],
        excludes: ["privateMethod", "staticMethod"],
        isNewIdentifierLocation: true,
    },
    {
        // static base members and class member keywords allowed
        marker: [
            "classThatExtendsClassExtendingAnotherClassAndTypesStatic",
            "classThatExtendsClassExtendingAnotherClassWithOverridingMemberAndTypesStatic"
        ],
        ...includeExclude("staticMethod"),
        isNewIdentifierLocation: true,
    }
);
