# growbot 🌱

Bucket-based, code-powered, 3d-printed horticulture

### Requirements

- Python >=3.11
- Poetry
- Docker
- Make (optional)

### Server Setup

#### Docker

1. Copy _config/template.env_ to _config/.env_ and configure
2. Pull containers with `docker compose pull`
3. Run with `docker compose up` (`-d`
   )

### Sidekick Deployment

Update sidekick code via rsync with `make update`

Refresh the display with `make display`
