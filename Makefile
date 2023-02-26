up:
	docker compose build; docker compose up

mqtt:
	python -m server.hub.mqtt

update:
	rsync -azP . pi@pi-01:/home/pi/growbot

display:
	rsync -azP . pi@pi-01:/home/pi/growbot
	ssh pi@pi-01 /usr/bin/python3 /home/pi/growbot/pi_display/display.py

run:
	rsync -azP . pi@pi-01:/home/pi/growbot
	ssh pi@pi-01 /usr/bin/python3 /home/pi/growbot/pi_display/main.py