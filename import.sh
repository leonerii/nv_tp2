#!/bin/bash

mongoimport -d virt -c users --jsonArray --file /opt/dbimport.json