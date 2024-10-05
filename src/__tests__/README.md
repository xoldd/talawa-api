# About

This directory contains test code for performing integration tests or api tests against talwa api. The tests in this directory must follow the practices of black box testing. 

# Black box testing

Black box testing in this context means we test talawa api from the perspective of a client making requests to talawa api. This also means that we must only use the public interfaces exposed by talawa api for communicating with it. 

In the context of REST api interfaces exposed by talawa api it means using standard HTTP methods like GET, POST, PATCH, PUT, DELETE etc., and in the context of graphql api interfaces exposed by talawa api it means using standard query, mutation and subscription graphql operations(over HTTP POST method for our use case).

