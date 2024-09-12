# Files and folders left to migrate:-

.dockerignore
.github
.husky
.node-version
.pylintrc
codegen.ts
config
docker-compose.dev.yaml
docker-compose.prod.yaml
Containerfile.dev
Containerfile.prod
docs
images
locales
logs
requirements.txt
sample_data
schema.graphql
scripts
setup.ts
talawa-api-docs
videos

# To research about:-

Both host and container based reproducible development environment setup with live refresh and hot-module replacement functionality. Code editor should be on host system but everything else should be containerized. Possible solutions:-
1. Dev containers, test containers:- Code editor should be on the host system but everything else should be containerized. The code editor workspace context would be inside the containers. [Devpod](https://devpod.sh/) is one way to do this.
2. Nix flakes:- Code editor should be on the host system along with everything else. The code editor workspace context would be on the host system as well.

SQL migrations version control.

# Setup testing environments

https://github.com/goldbergyoni/nodebestpractices
https://github.com/goldbergyoni/javascript-testing-best-practices
https://github.com/testjavascript/nodejs-integration-tests-best-practices

# devcontainers

development

git
github cli

ci

THE DOCKER VOLUMES ARE OWNED BY THE ROOT USER BY DEFAULT, MUST BE CHANGED TO BE OWNED BY A NON ROOT USER.

# expand and contract database migrations

name -> firstname, lastname

add nullable `firstname` and `lastname` columns to the database, update the server code to write to `name`, `firstname` and `lastname` columns but still read from the `name` column

run a background task that produces and stores values for the currently null `firstname` and `lastname` columns from the `name` column

once the previous task is complete and no null `firstname` and `lastname` columns remain update the server code to stop writing to the `name` column and start reading from the `firstname` and `lastname` columns

once the previous task is complete remove the `name` column from the database

# To write documentation about:-

write code in a way that considers environment variables passed dynamically
docker
docker compose
different environments for talawa api
gql.tada

# presentation

devcontainer
testing infrastructure
type safe graphql documents in integration tests with gql.tada