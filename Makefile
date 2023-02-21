update:
	rsync -azP . pi@pi-01:/home/pi/growbot

display:
	rsync -azP . pi@pi-01:/home/pi/growbot
	ssh pi@pi-01 /usr/bin/python3 /home/pi/growbot/pi/display.py

run:
	rsync -azP . pi@pi-01:/home/pi/growbot
	ssh pi@pi-01 /usr/bin/python3 /home/pi/growbot/pi/main.py