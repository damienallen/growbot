up:
	docker compose build; docker compose up

pi:
	docker compose -f docker-compose.yml -f docker-compose.pi.yml up

build-pi:
	docker compose -f docker-compose.yml -f docker-compose.pi.yml build

bash-pi:
	docker compose -f docker-compose.yml -f docker-compose.pi.yml run --rm server bash

sync-camera:
	rsync -azP pi@pi-01:/home/pi/image.jpg ~/growbot/data/capture.jpg

update:
	rsync -azP . pi@pi-01:/home/pi/growbot

display:
	rsync -azP . pi@pi-01:/home/pi/growbot
	ssh pi@pi-01 /usr/bin/python3 /home/pi/growbot/sidekick/display.py

run:
	rsync -azP . pi@pi-01:/home/pi/growbot
	ssh pi@pi-01 /usr/bin/python3 /home/pi/growbot/sidekick/main.py

mqtt:
	python -m server.hub.mqtt
