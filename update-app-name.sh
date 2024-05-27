#!/bin/bash

read -p "Enter the new app name: " NEW_NAME

# Update package.json
sed -i.bak "s/\"name\": \".*\",/\"name\": \"$NEW_NAME\",/" package.json

# Update strings.xml
sed -i.bak "s/<string name=\"app_name\">.*<\/string>/<string name=\"app_name\">$NEW_NAME<\/string>/" android/app/src/main/res/values/strings.xml

echo "App name updated to: $NEW_NAME"
