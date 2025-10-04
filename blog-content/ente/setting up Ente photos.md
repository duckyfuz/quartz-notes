---
title: backing up photos for $0.006/gb
description: a quick guide on how to self-host Ente photos with Backblaze B2
tags:
  - backblaze
  - Ente
  - docker
---
#### initializing Ente
we can initialize Ente with the provided quickstart script:
```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ente-io/ente/main/server/quickstart.sh)"
```

this script will create a `/my-ente` directory, featuring these files:
`compose.yaml`: a docker compose configuration file that defines the services
`museum.yaml`: a config file containing settings for database connections, S3 object storage (MinIO), encryption keys, and JWT secrets

the docker compose setup involves two other docker volumes - `postgres-data` and `minio-data`
- in the following steps, we will be getting rid of `minio-data` in favor of b2

#### exposing via reverse proxy
this step requires a reverse proxy. for security, Ente does not support http connections

i will be using [caddy](https://notes.kenf.dev/self-hosted/caddy-server), as it automatically obtains and refreshes TLS certificates. add the following into your `Caddyfile`
```
# /etc/caddy/Caddyfile

ente.your-domain.com {
        reverse_proxy http://localhost:3000
}

ente-api.your-domain.com {
        reverse_proxy http://localhost:8080
}
```

#### setting up b2 bucket
backblaze b2 is s3 compatible (and a lot cheaper), which is why we will be using it for this project. we will need to create add the following rules to enable CORS

```
b2 bucket update --cors-rules "$(<./b2_cors_for_ente.json)" b2-bucket-name allPrivate
```

![[b2_cors_for_ente.json]]

```
[
  {
    "corsRuleName": "entephotos",
    "allowedOrigins": [
      "*"
    ],
        "allowedHeaders": [
          "range",
          "authorization",
          "Referer",
          "Content-Type",
          "X-Bz-File-Name",
          "X-Bz-Part-Number",
          "X-Bz-Content-Sha1",
          "X-Auth-Token",
          "X-Client-Package",
          "X-Client-Version",
          "X-Auth-Access-Token"
        ],
    "allowedOperations": [
      "b2_download_file_by_id",
      "b2_download_file_by_name",
      "b2_upload_file",
      "b2_upload_part",
      "s3_get",
      "s3_post",
      "s3_put",
      "s3_head"
    ],
    "exposeHeaders": [
      "X-Amz-Request-Id",
      "X-Amz-Id-2",
      "ETag"
    ],
    "maxAgeSeconds": 3600
  }
]
```

credit: [mnvr](https://github.com/ente-io/ente/discussions/1764#discussioncomment-9478204) from Ente

#### linking b2 to Ente
```
s3:
      are_local_buckets: false
      use_path_style_urls: true
      b2-eu-cen:
        endpoint: https://s3.{b2-region}.backblazeb2.com
        bucket: {b2-bucket-name}
        key: {b2-key-id}
        secret: {b2-application-key}
        region: {b2-region}
```

#### creating your account
now, you should go over to the web ui on your site and create an account. note that you will have to access the server logs to retrieve the otp

following which, you can disable new signups by adding the following to `museum.yaml`
```
internal:
    disable-registration: true
```

#### whitelist your account as admin
follow the steps [here](https://help.ente.io/self-hosting/administration/users#whitelist-admins)

#### upgrade your account (admin required)
download the pre-built binary [here](https://github.com/ente-io/ente/releases?q=tag:cli-v0)

> [!warning] before using Ente cli
> note that you will first need to specify the api endpoint
> to do so, we can create a config **directory** and add a config.yaml **file**
> ```
> # config.yaml
> 
> endpoint:
> 	api: https://ente-api.your-domain.dev
> ```
> we then prefix our commands with `ENTE_CLI_CONFIG_DIR=./config`
> 
> do note that `ente-cli.db` will also be created in that directory

```
# authenticate (using the whitelisted account)
ente account add

# upgrade account
ente admin update-subscription -a <admin-user-mail> -u <user-email-to-update> --no-limit True
```

#### setting up public albums (optional)
we need two instances of the web app to handle public shares. let's append some stuff to our config files

```
# museum.yaml
 
apps:
  public-albums: https://albums.your-domain.dev
```

```
# compose.yaml

web:
  image: ghcr.io/ente-io/web
  ports:
    - 3000:3000
  environment:
    ENTE_API_ORIGIN: https://ente-api.your-domain.app
    ENTE_ALBUMS_ORIGIN: https://albums.your-domain.app
 
albums:
  image: ghcr.io/ente-io/web
  ports:
    - 3002:3002
  environment:
    ENTE_API_ORIGIN: https://ente-api.your-domain.app
    ENTE_ALBUMS_ORIGIN: https://albums.your-domain.app
```

```
# /etc/caddy/Caddyfile

albums.your-domain.app {
    reverse_proxy {
      to http://localhost:3002
    }
}
```

#### backups (IMPORTANT)
we're almost there! however, we MUST remember that Ente is e2e encrypted - this means that backing up just the objects to r2 is not enough (in fact, if you view your bucket on r2, all you can see is gibberish)

![[ente-bucket-redacted.png]]

so we have to backup the following as well:
- `museum.yaml`, `compose.yaml`
- postgresdb

for `museum.yaml` and `compose.yaml`, we want to simply copy the files over to somewhere safe

for postgresdb, we can set up an additional container for daily backups
```
  # compose.yaml
  
  backup:
    image: eeshugerman/postgres-backup-s3:15
    environment:
      SCHEDULE: "@daily"
      BACKUP_KEEP_DAYS: 30
      S3_REGION: {b2-region}
      S3_ENDPOINT: https://s3.{b2-region}.backblazeb2.com
      S3_ACCESS_KEY_ID: {b2-key-id}
      S3_SECRET_ACCESS_KEY: {b2-application-key}
      S3_BUCKET: {b2-bucket-name}
      S3_PREFIX: backups
      POSTGRES_HOST: postgres
      POSTGRES_DATABASE: ente_db
      POSTGRES_USER: pguser
      POSTGRES_PASSWORD: {your-postges-password}
```

#### future enhancements
you might be wondering what `wasabi-eu-central-2-v3` and `scw-eu-fr-v3` in `museum.yaml` were for, and why we removed them at the start - well, it's for [reliability and replication](https://ente.io/reliability/)
- ideally, we would want to replicate across different cloud providers, and across different storage tiers (for cost savings)

but Backblaze's 99.9% uptime is good enough for me, so this is the end of the guide!

#backblaze #Ente #docker