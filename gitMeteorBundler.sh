echo Building Meteor-app in OpenShift repo

meteor build ../quizzipedia_OS --directory --server-only
echo Successfully builded

cd ../quizzipedia_OS
git add --all 
git commit -m "New Meteor Deployment"
git push
