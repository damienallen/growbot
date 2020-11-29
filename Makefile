update:
	rsync -azP . pi@192.168.178.37:/home/pi/growbot

display:
	rsync -azP . pi@192.168.178.37:/home/pi/growbot
	ssh pi@192.168.178.37 python3 /home/pi/growbot/display.py