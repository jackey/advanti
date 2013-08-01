#!/usr/bin/env bash

DOMAIN="advanti.local"
PWD=`pwd`

cd $PWD/html

pwd
# Install
drush si drupalyun \
	--db-url=mysql://root:admin@localhost:3306/advanti_local\
	--account-name=admin \
	--account-pass=admin \
	--site-mail=drupalyun@drupalyun.com \
	--locale=zh-hans \
	--site-name=advanti \
	--sites-subdir=$DOMAIN \
	-y

# Clean
cd -
chmod -R 755 $PWD/html/sites/$DOMAIN
