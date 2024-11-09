# Setup

We make use of [devcontainers](https://containers.dev/) to provide a relatively automated way of setting up the development environment for talawa api locally on your operating system. 

> We don't provide instructions for manually setting up talawa api because there's simply too much work and brittleness in setting up talawa api(or any remotely complex project) on different operating systems reliably.   

Follow the steps below to set up talawa api development environment on your operating system:

> We make use of docker containers for different workflows in talawa api and docker only really works on a linux based operating system. On operating systems like windows and macOS docker works by running a seperate linux virtual machine and running within it so the performance will take a bit of hit. Docker also has a few compatibility issues with windows and macOS. As such, we recommend using linux based operating systems for setting up and working on talawa api(or any software project really) because linux is simply the best operating system for working with containers. You'll simply have a better time working with docker if you're using a linux based operating system. Our recommendations for linux based operating systems are the mainstream distributions like debian, ubuntu, arch and fedora.

## Setup docker

Follow the installation guide at [this](https://docs.docker.com/get-docker/) link and install docker on your operating system.

### For windows users

For better performance we recommend using docker with wsl. More information can be found at [this](https://docs.docker.com/desktop/wsl/) link.

### For macOS users

For better performance and compatibility we recommend using docker with colima. More information can be found at [this](https://github.com/abiosoft/colima) link.

## Setup vscode

Follow the installation guide at [this](https://code.visualstudio.com/docs/setup/setup-overview) link and install vscode on your operating system.

<!-- ## Setup devpod

Follow the installation guide at [this](https://devpod.sh/docs/getting-started/install#optional-install-devpod-cli) link and install devpod cli for your respective operating system.

`devpod provider add docker`

`devpod provider update docker`

`devpod up github.com/PalisadoesFoundation/talawa-api@develop --id talawa_api` -->