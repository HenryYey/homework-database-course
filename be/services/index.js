const mysql = require('mysql');
const SQL = require('./SQL');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'course'
});

connection.connect();

const timer = {}
const tables = {}

timer.getEvents = async (ctx, next) => {
  return new Promise((resolve, reject) => {
    connection.query(SQL.getEvents(), function (err, result) {
      console.log(SQL.getEvents());
      if (err) {
        reject(new Error('[ERROR] - ' + err.message));
      }
      console.log('--------------------------query SUCCESS----------------------------');
      console.log(result);
      console.log('--------------------------------------------------------------------\n\n');
      resolve(result);
    });
  }).then(result => {
    ctx.result = result;
    return next();
  }).catch(err => {
    throw err;
  })
}

timer.addEvents = async (ctx, next) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      start_time,
      end_time
    } = ctx.request.body
    console.log(name, start_time, end_time)
    connection.query(SQL.addEvents(name, start_time, end_time), function (err, result) {
      console.log(SQL.addEvents(name, start_time, end_time));
      if (err) {
        reject(new Error('[ERROR] - ' + err.message));
      }
      console.log('--------------------------insert SUCCESS----------------------------');
      console.log(result);
      console.log('--------------------------------------------------------------------\n\n');
      const keys = ["name", "start_name", "end_time"]
      const vals = [name, start_time, end_time]
      logger('time', keys, vals, 'INSERT');
      resolve(result);
    });
  }).then(result => {
    ctx.result = result;
    return next();
  }).catch(err => {
    throw err;
  })
}

tables.getTables = async (ctx, next) => {
  const tablesName = []
  return new Promise((resolve, reject) => {
    connection.query(SQL.getTablesName(), function (err, result) {
      console.log(SQL.getTablesName());
      if (err) {
        reject(new Error('[ERROR] - ' + err.message));
      }
      resolve(result);
    });
  }).then(results => {
    results.forEach((item) => {
      tablesName.push(item.TABLE_NAME)
    });
  }).then(res => {
    ctx.result = tablesName
    return next()
  }).catch(err => {
    throw err;
  })

}

tables.getTable = async (ctx, next) => {
  const {
    name
  } = ctx.request.query
  console.log(name)
  return new Promise((resolve, reject) => {
    connection.query(SQL.getRows(name), function (err, result) {
      console.log(SQL.getRows(name));
      if (err) {
        reject(new Error('[ERROR] - ' + err.message));
      }
      resolve(result);
    });
  }).then(res => {
    ctx.result = res
    return next()
  }).catch(err => {
    throw err;
  })
}

tables.updateRow = async (ctx, next) => {
  const { name, keys,vals } = ctx.request.body
  console.log(name, keys, vals)
  return new Promise((resolve, reject) => {
    connection.query(SQL.updateRowByKeys(name, keys, vals), function (err, result) {
      console.log(SQL.updateRowByKeys(name, keys, vals));
      if (err) {
        reject(new Error('[ERROR] - ' + err.message));
      }
      logger(name, keys, vals, 'UPDATE');
      resolve(result);
    });
  }).then(res => {
    ctx.result = res
    return next()
  }).catch(err => {
    throw err;
  })
}

tables.deleteRow = async (ctx, next) => {
  const {
    name,
    keys,
    vals
  } = ctx.request.body
  console.log(name, keys, vals)
  return new Promise((resolve, reject) => {
    connection.query(SQL.deleteRowByKeys(name, keys, vals), function (err, result) {
      console.log(SQL.deleteRowByKeys(name, keys, vals));
      if (err) {
        reject(new Error('[ERROR] - ' + err.message));
      }
      logger(name, keys, vals, 'DELETE');
      resolve(result);
    });
  }).then(res => {
    ctx.result = res
    return next()
  }).catch(err => {
    throw err;
  })
}
const logger = (table, keys, vals, operation) => {
  console.log(vals)
  connection.query(SQL.operateLog (table, keys, vals, operation), function (err, result) {
    console.log(SQL.operateLog(table, keys, vals, operation));
    if (err) {
      throw new Error('[ERROR] - ' + err.message);
    }
  });
}

module.exports = {
  timer,
  tables
}