# About this directory

This directory stores all code that is required for creating the executable graphql schema that can be consumed by the graphql server. We follow pothos graphql based code-first approach for our graphql implementation.

# About pothos

Pothos is a code-first graphql schema builder written in typescript from the ground up with an extensible plugin-based architecture. More about pothos can be found at this [link](https://pothos-graphql.dev/). As far as we're aware it is the best typescript based, code-first graphql schema builder.

# Directory structure

The `./builder.ts` file contains the 

Pothos relies on the side-effect feature of javascript module imports for resolving pothos schema definitions at runtime to create the executable graphql schema for consumption by the graphql server. More about javascript's side-effect module imports can be found at this [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#import_a_module_for_its_side_effects_only).

The files and folders in this directory are structured to facilitate this requirement of pothos and also seperated on the` basis of graphql data types that the pothos schema definitions defined within them represent.

1. `./builder.ts`:- This file exports the pothos schema builder instance that is used to create all pothos schema definitions in this directory.
2. `./enums`:- This directory contains pothos schema definitions for graphql's `enum` data type.
3. `./index.ts`:- This file exports the executable graphql schema for consumption by the graphql server.
2. `./inputs`:- This directory contains pothos schema definitions for graphql's `input` data type.
3. `./interfaces`:- This directory contains pothos schema definitions for graphql's `interface` data type.
4. `./scalars`:- This directory contains pothos schema definitions for graphql's `scalar` data type.
5. `./types`:- This directory contains pothos schema definitions for graphql's `type` data type.
6. `./unions`:- This directory contains pothos schema definitions for graphql's `union` data type.

