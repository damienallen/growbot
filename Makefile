# docker
up:
	docker compose build server; docker compose up

build:
	docker compose build server

push:
	docker compose push server

pull:
	docker compose pull

pi-up:
	docker compose -f docker-compose.yml -f docker-compose.pi.yml up

pi-bash:
	docker compose -f docker-compose.yml -f docker-compose.pi.yml run --rm server bash


# pi4-server
pull-camera:
	rsync -azP pi@pi4:/home/pi/captures ~/growbot/data


# crony
crony-update:
	rsync -azP ./crony pi@pi-01:/home/pi

crony-display:
	rsync -azP ./crony pi@pi-01:/home/pi
	ssh pi@pi-01 /usr/bin/python3 /home/pi/crony/display.py

crony-run:
	rsync -azP ./crony pi@pi-01:/home/pi
	ssh pi@pi-01 /usr/bin/python3 /home/pi/crony/main.py


# communication
mqtt:
	python -m server.hub.mqtt

capture:
	python -m server.hub.capture