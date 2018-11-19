const Datastore = require("@google-cloud/datastore");
const config = require("../config");

const ds = Datastore({
  projectId: config["GCLOUD_PROJECT"]
});

function fromDatastore(obj) {
  obj.id = obj[Datastore.KEY].id;
  return obj;
}

function toDatastore(obj, nonIndexed) {
  nonIndexed = nonIndexed || [];
  let results = [];
  Object.keys(obj).forEach(k => {
    if (obj[k] === undefined) {
      return;
    }
    results.push({
      name: k,
      value: obj[k],
      excludeFromIndexes: nonIndexed.indexOf(k) !== -1
    });
  });
  return results;
}

// Lists all books in the Datastore sorted alphabetically by title.
// The ``limit`` argument determines the maximum amount of results to
// return per page. The ``token`` argument allows requesting additional
// pages. The callback is invoked with ``(err, books, nextPageToken)``.
function list(kind, cb, limit) {
  const q = ds
    .createQuery([kind])
    .limit(limit)
    .order("time", {
      descending: true
    });

  ds.runQuery(q, (err, entities, nextQuery) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, entities.map(fromDatastore));
  });
}

// Creates a new book or updates an existing book with new data. The provided
// data is automatically translated into Datastore format. The book will be
// queued for background processing.
function update(kind, id, data, cb) {
  let key;
  if (id) {
    key = ds.key([kind, parseInt(id, 10)]);
  } else {
    key = ds.key(kind);
  }

  const entity = {
    key: key,
    data: toDatastore(data, ["description"])
  };

  ds.save(entity, err => {
    data.id = entity.key.id;
    cb(err, err ? null : data);
  });
}

function create(data, cb) {
  update(kind, null, data, cb);
}

function read(kind, id, cb) {
  const key = ds.key([kind, parseInt(id, 10)]);
  ds.get(key, (err, entity) => {
    if (!err && !entity) {
      err = {
        code: 404,
        message: "Not found"
      };
    }
    if (err) {
      cb(err);
      return;
    }
    cb(null, fromDatastore(entity));
  });
}

function _delete(kind, id, cb) {
  const key = ds.key([kind, parseInt(id, 10)]);
  ds.delete(key, cb);
}

module.exports = {
  create,
  read,
  update,
  delete: _delete,
  list
};
