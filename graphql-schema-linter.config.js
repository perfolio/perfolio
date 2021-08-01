module.exports = {
  rules: [
    // This rule will validate that all field arguments have a description.
    "arguments-have-descriptions",

    // This rule will validate that all defined types are used at least once in the schema.
    "defined-types-are-used",

    // This rule will validate that all deprecations have a reason.
    "deprecations-have-a-reason",

    // This rule will validate that all descriptions, if present, start with a capital letter.
    "descriptions-are-capitalized",

    // This rule will validate that all enum values are capitalized.
    "enum-values-all-caps",

    // This rule will validate that all enum values have a description.
    "enum-values-have-descriptions",

    // This rule will validate that object type fields and interface type fields have a description.
    "fields-have-descriptions",

    // This rule will validate that input object value names are camel cased.
    "input-object-values-are-camel-cased",

    // This rule will validate that input object values have a description.
    "input-object-values-have-descriptions",

    // This rule will validate that interface types and object types have capitalized names."
    "types-are-capitalized",

    // This will will validate that interface types, object types, union types, scalar types, enum types and input types have descriptions.
    "types-have-descriptions",
  ],
  schemaPaths: ["./libs/**/schema.gql"],
}
