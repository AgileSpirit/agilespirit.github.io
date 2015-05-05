---
layout: post
title: "Des outils"
date: 2014-06-26
published: false
excerpt: Fabriquer le bon produit, le faire bien et rapidement nécessite de bien gérer ses outils.
disqus: false
---

## Environnement :
- VirtualBox
- Ubuntu Server 14.10.04 (avec Apache, Tomcat)

### Ouverture de la VM à la machine Host
set mode bridged
get IP address

##Jenkins

### Install Jenkins
wget http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key
sudo apt-key add jenkins-ci.org.key
sudo sh -c 'echo deb http://pkg.jenkins-ci.org/debian binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins

### Configure Jenkins
sudo vi /etc/default/jenkins
=> modifier le port (8080 => 8081)

### Liens
http://blog.htxiong.com/2013/06/install-jenkins-on-ubuntu-and-setting.html

## Git
sudo apt-get install git

https://gitlab.com/gitlab-org/gitlab-ce/blob/6-8-stable/doc/install/database_mysql.md

## NodeJS

