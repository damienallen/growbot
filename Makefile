update:
	rsync -azP . pi@192.168.178.37:/home/pi/growbot

display:
	rsync -azP . pi@192.168.178.37:/home/pi/growbot
	ssh pi@192.168.178.37 /usr/bin/python3 /home/pi/growbot/pi/display.py

run:
	rsync -azP . pi@192.168.178.37:/home/pi/growbot
	ssh pi@192.168.178.37 /usr/bin/python3 /home/pi/growbot/pi/main.py

deploy-server:
	@echo "Deploying to 192.168.178.202"
	rsync -azP . -e "ssh -i ~/.ssh/id_ed25519" pi@192.168.178.202:/home/pi/code/

deploy-io:
	@echo "Deploying to 192.168.178.201"
	rsync -azP . -e "ssh -i ~/.ssh/id_ed25519" pi@192.168.178.201:/home/pi/code/