import {openDB} from 'idb';


const currentVersion = 1;
const schema = {
  "name": {
  },
  "depth": {
  },
  "time_commitment": {
  },
  "difficulty": {
  },
  "phase": {
  }
};

export default function Store(dbName) {
  this.db = null;
  this.name = dbName;

  this.setData = (objectList) => {
  };

  return openDB(dbName, currentVersion, {
    upgrade(db, old, nw, tx, e) {
      console.log("upgrade", db, old, nw, tx);

      let topicsTableName = "topics";
      if (!db.objectStoreNames.contains(topicsTableName)) {
        let topics = db.createObjectStore(topicsTableName, {
          keyPath: "id",
          autoIncrement: true,
        });
        //let topicIdxName = topicsTableName + "_idx";
        //let topicIdx = db.createIndex(topicIdxName, "id");

        console.log("created ", topicsTableName);
      }
    },
  }).then(db => {
    this.db = db;
    window.db = db;
    window.store = this;

    return this.db;
  });
}
