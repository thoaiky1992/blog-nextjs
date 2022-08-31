#!bin/bash
sudo yarn add && sudo npm docker:deploy && sudo docker rmi $(sudo docker images -f "dangling=true" -q)
