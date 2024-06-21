#!/bin/sh

# Replace environment variables in JavaScript files
for file in /usr/src/app/build/static/js/*.js; do
  sed -i "s|REACT_APP_REDIRECT_URL_PLACEHOLDER|$REACT_APP_REDIRECT_URL|g" $file
  sed -i "s|REACT_APP_LID_PLACEHOLDER|$REACT_APP_LID|g" $file
  sed -i "s|REACT_APP_GOOGLE_TOKEN_PLACEHOLDER|$REACT_APP_GOOGLE_TOKEN|g" $file
done

# Serve the app
npx serve -s build