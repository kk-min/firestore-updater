# Firestore Updater
Copyright © 2022 Min Kabar Kyaw

Accesses a specified collection in Firestore and adds documents to it; for debugging purposes.

**Please note that you must configure your own firebase project in firebase.js in order for the app to work.**

# Features

## Dynamic Collection Path

You can choose which collection in Firestore to observe by changing the collection path. Note that this also works for nested collections provided that the document id of the subcollection is known.

## Live Data Display

The display of all documents for the specified collection is updated live.

## Add Documents

Documents can be added to the current displayed collection by creating field-value pairs and sending it to the collection.


