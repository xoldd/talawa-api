To reload Caddy after making changes to the `./docker/Caddyfile` file run the following command in the root directory of this project: 
```bash
docker compose exec -f ./docker/compose.yaml -w /etc/caddy caddy caddy reload
```
More info at [this](https://caddyserver.com/docs/running#usage) link.