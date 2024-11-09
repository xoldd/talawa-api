# About this directory

This directory is intended for storing all the graphql specific code that is not tied to any specific protocol. GraphQL specification is protocol agnostic and as such designing our executable graphql schema to be protocol agnostic is beneficial for the future. Talawa api's graphql implementation follows code-first approach using the pothos library.

# About pothos

Pothos is a code-first graphql schema builder written from the ground up to be fully compatible with typescript with an extensible plugin-based architecture. More about pothos can be found at [this](https://pothos-graphql.dev/) link. As far as we're aware it is currently the best typescript based graphql library for implementing graphql with code-first approach. 

# Pothos requirement

Pothos relies on the side-effect feature of javascript module imports for resolving pothos schema definitions at runtime to create the executable graphql schema for consumption by the graphql server. More about javascript's side-effect module imports can be found at [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#import_a_module_for_its_side_effects_only) link.

The files and folders in this directory are structured to facilitate this requirement of pothos and are also seperated on the basis of graphql data types that the pothos schema definitions defined within them represent. The pothos schema definitions in the files listed below are imported into the execution context of the `./schema.ts` file to make the side-effect feature of javascript module imports work at runtime: 

1. `./enums/index.ts`
2. `./inputs/index.ts`
3. `./interfaces/index.ts`
4. `./scalars/index.ts`
5. `./types/index.ts`
6. `./unions/index.ts`