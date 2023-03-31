# growbot 🌱

Bucket-based, code-powered, 3d-printed horticulture

### Requirements

- Python >=3.11
- Poetry
- Docker
- Make (optional)

### Server Setup

#### Hardware

A Raspberry Pi 4 is used as a central server on the local network.

#### Docker

1. Copy _config/template.env_ to _config/.env_ and configure
2. Pull containers with `docker compose pull` or `make pull`
3. Run with `docker compose up` (`-d`) or `make up`

### Crony Deployment

This project leverages a Raspberry Pi Zero W to faciliate image captures and

#### Command Referece

- `make update` to update Python scripts on the crony Pi via rsync
- `make display` to update the eInk display
-
