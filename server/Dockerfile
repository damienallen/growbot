FROM python:3.11 as dev

ENV DATA_DIR=/data \
  CAPTURE_DIR=/data/captures \
  # python
  PYTHONUNBUFFERED=1 \
  PYTHONFAULTHANDLER=1 \
  PYTHONHASHSEED=random \
  PYTHONDONTWRITEBYTECODE=1 \
  # pip
  PIP_NO_CACHE_DIR=1 \
  PIP_DISABLE_PIP_VERSION_CHECK=1 \
  PIP_DEFAULT_TIMEOUT=100 \
  # poetry
  POETRY_VERSION=1.4.0 \
  POETRY_NO_INTERACTION=1 \
  POETRY_VIRTUALENVS_CREATE=false \
  POETRY_CACHE_DIR=/var/cache/pypoetry \
  POETRY_HOME=/usr/local

# Install system dependencies
RUN apt-get update && apt-get upgrade -y \
  && apt-get install --no-install-recommends -y bash nano cron rsync

# Install Poetry & Python dependencies
RUN curl -sSL 'https://install.python-poetry.org' | python -
WORKDIR /code

COPY ./pyproject.toml /poetry.lock* /code/
RUN touch __init__.py \
  && poetry install --no-root --no-dev

# Copy & install cronjobs
# COPY ./cron /etc/cron.d/cronjob
# RUN chmod 0644 /etc/cron.d/cronjob && crontab /etc/cron.d/cronjob

# Copy modules in production
FROM dev as prod
COPY . server/