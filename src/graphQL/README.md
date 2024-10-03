# About this directory

This directory is intended for storing all the graphQL specific code that is not tied to any specific protocol. GraphQL specification is protocol agnostic and as such designing our executable graphQL schema to be protocol agnostic is beneficial for the future. We follow code-first approach for our graphQL implementation using the pothos library.

# About pothos

Pothos is a code-first graphQL schema builder written from the ground up to be fully compatible with typescript with an extensible plugin-based architecture. More about pothos can be found at [this](https://pothos-graphql.dev/) link. As far as we're aware it is the best typescript based graphQL library for implementing graphQL with code-first approach. 

Pothos relies on the side-effect feature of javascript module imports for resolving pothos schema definitions at runtime to create the executable graphQL schema for consumption by the graphQL server. More about javascript's side-effect module imports can be found at [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#import_a_module_for_its_side_effects_only) link.

The files and folders in this directory are structured to facilitate this requirement of pothos and also seperated on the basis of graphQL data types that the pothos schema definitions defined within them represent.
