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
  let str1 = ""
  let str2 = ""

  if (keys.length > 1) {
    keys.forEach((item, index) => {
      if (index !== keys.length - 1)
        str1 += "`" + item + "`,"
      if (index === keys.length - 1)
        str1 += "`" + item + "`" 
    });
    vals.forEach((item, index) => {
      if (index !== vals.length - 1)
        str2 += `'${item}',`
      if (index === vals.length - 1)
        str2 += `'${item}'`
    });
  }
  return `INSERT INTO  ${table} (${str1}) VALUES (${str2})`
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