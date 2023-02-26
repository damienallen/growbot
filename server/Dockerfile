FROM python:3.11 as development


ENV \
  # pip:
  PIP_NO_CACHE_DIR=1 \
  PIP_DISABLE_PIP_VERSION_CHECK=1 \
  PIP_DEFAULT_TIMEOUT=100 \
  # poetry:
  POETRY_VERSION=1.3.2 \
  POETRY_NO_INTERACTION=1 \
  POETRY_VIRTUALENVS_CREATE=false \
  POETRY_CACHE_DIR='/var/cache/pypoetry' \
  POETRY_HOME='/usr/local'

# Install system dependencies
RUN apt-get update && apt-get upgrade -y \
  && apt-get install --no-install-recommends -y bash

# Install Poetry
RUN curl -sSL 'https://install.python-poetry.org' | python -

WORKDIR /code
COPY ./pyproject.toml /poetry.lock* /code/
RUN touch __init__.py \
  && poetry install --no-root --no-dev

# Set start command
CMD ["uvicorn", "server.app.main:app", "--reload", "--host", "0.0.0.0"]

# Copy files in production
FROM development as production
COPY . /code/server
CMD ["uvicorn", "server.app.main:app", "--host", "0.0.0.0"]