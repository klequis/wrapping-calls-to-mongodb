mongo todo-dev --port 27017 -u user -p password --authenticationDatabase admin
db.createRole({
  role: "readWriteMinusDropRole",
  privileges: [
  {
    resource: { db: "social", collection: ""},
    actions: [ "collStats", "dbHash", "dbStats", "find", "killCursors", "listIndexes", "listCollections", "convertToCapped", "createCollection", "createIndex", "dropIndex", "insert", "remove", "renameCollectionSameDB", "update"]} ],
    roles: []
  }
);