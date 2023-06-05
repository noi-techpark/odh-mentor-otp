<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

```
environments:
  default: prod
  #default environment if NODE_ENV is not defined

prod:
  listen_port: 8091
dev:
  listen_port: 9091
  polling_interval: 2

polling_interval: 120

endpoints:
  default:
    hostname: api.xxx.it
    method: GET
    port: 443
    #path: /v2
    headers:
      User-Agent: OpenMove-Api-Client

  stations:
    path: /v2/path/to/retrieve/data.json
```
