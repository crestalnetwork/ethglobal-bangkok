# build
FROM golang:1.23 AS build-env

WORKDIR /app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify

# no cache below this line
ADD . /app

RUN --mount=type=cache,target=/root/.cache/go-build go test ./... && go build -o bin/api ./backend


# mini image
FROM debian:12-slim

RUN apt-get update \
    && apt-get install -y -q --no-install-recommends ca-certificates curl \
    && apt-get clean

WORKDIR /app

COPY --from=build-env  /app/bin/api /usr/bin/api

ARG RELEASE

ENV RELEASE=$RELEASE

ENTRYPOINT ["api"]
