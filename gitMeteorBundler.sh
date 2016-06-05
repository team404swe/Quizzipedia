echo Building Meteor-app in OpenShift repo

meteor build ../quizzipedia --directory --server-only
echo Successfully builded

cd ../quizzipedia
git add --all 
git commit -m "New Meteor Deployment"
git push
