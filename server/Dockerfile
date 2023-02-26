FROM python:3.11 as dev

ENV PYTHONUNBUFFERED=1 \
  PYTHONFAULTHANDLER=1 \
  PYTHONHASHSEED=random \
  PYTHONDONTWRITEBYTECODE=1 \
  # pip
  PIP_NO_CACHE_DIR=1 \
  PIP_DISABLE_PIP_VERSION_CHECK=1 \
  PIP_DEFAULT_TIMEOUT=100 \
  # poetry
  POETRY_VERSION=1.3.2 \
  POETRY_NO_INTERACTION=1 \
  POETRY_VIRTUALENVS_CREATE=false \
  POETRY_CACHE_DIR=/var/cache/pypoetry \
  POETRY_HOME=/usr/local

# Install system dependencies
RUN apt-get update && apt-get upgrade -y \
  && apt-get install --no-install-recommends -y bash nano

# Install Poetry & Python dependencies
RUN curl -sSL 'https://install.python-poetry.org' | python -
WORKDIR /code

COPY ./pyproject.toml /poetry.lock* /code/
RUN touch __init__.py \
  && poetry install --no-root --no-dev


# Copy files in production
FROM dev as prod
COPY . /code/server