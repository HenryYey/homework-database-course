const moment = require('moment')

const login = (userName, password) => {
  return `SELECT * FROM user WHERE username='${userName}' AND password='${password}'`
}
const getTablesName = () => {
  return `SELECT table_name FROM information_schema.tables WHERE table_schema='course'`
}
const getRows = (table) => {
  return `SELECT  * FROM ${table}`
}
// keys和vals为字符串数组 
const insertRow = (table, keys, vals) => {
  const keys_str = keys.join(",");
  const vals_str = vals.join(",");
  return `INSERT INTO  ${table} ( ${keys_str} ) VALUES ( ${vals_str})`
}
// keys和vals为字符串数组 
const updateRowByKeys = (table, keys, vals) => {
  let str = `${keys[0]} = '${vals[0]}'`
  if (keys.length > 1) {
    keys.forEach((item, index) => {
      let val = vals[index] ? `'${vals[index]}'` : null
      if(index === 0)
        str += ','
      if (index != 0 && index != keys.length - 1)
        str += ` ${item} = ${val},`
      if (index != 0 && index === keys.length - 1)
        str += ` ${item} = ${val}`
    });
  }
  return `UPDATE  ${table} SET ${str} WHERE ${keys[0]} = '${vals[0]}'`
}
const operateLog = (table, keys, vals, operation) => {
  let str = `{ ${keys[0]} : ${vals[0]}`
  if (keys.length > 1) {
    keys.forEach((item, index) => {
      let val = vals[index] ? `${vals[index]}` : 'null'
      if(index === 0)
        str += ','
      if (index != 0 && index != keys.length - 1)
        str += ` ${item} = ${val},`
      if (index != 0 && index === keys.length - 1)
        str += ` ${item} = ${val}`
    });
    str += '}';
  }
  // 默认第一个key为主键
  return "INSERT INTO  logs (`who`, `time`, `table_name`, `operation`, `key_value`) VALUES ('HenryYe', '"+moment().format('YYYY-MM-DD h:mm:ss')+"','"+table+"', '"+operation+"', '"+str+"')"
}

const deleteRowByKeys = (table, keys, vals) => {
  let str = `${keys[0]} = ${vals[0]}`
  // 默认第一个key为主键
  return `DELETE FROM ${table} WHERE ${str}`
}
const getEvents = () => {
  return `SELECT * FROM time`
}
const addEvents = (name, start_time, end_time) => {
  return "INSERT INTO `time`(`name`, `start_time`, `end_time`) VALUES ('" + name + "', '" + start_time + "', '" + end_time + "')";
}

module.exports = {
  login,
  getEvents,
  addEvents,
  getTablesName,
  getRows,
  insertRow,
  updateRowByKeys,
  deleteRowByKeys,
  operateLog
}