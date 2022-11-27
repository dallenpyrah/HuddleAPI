cd ~/aws-codedeploy
pm2 stop all
pm2 start build/index.js -i max
