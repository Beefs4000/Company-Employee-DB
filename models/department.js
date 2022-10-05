const { connect } = require("../db/connect")


async function addDepartment(name) {

    const db = await connect();

    await db.query('INSERT INTO `employee_cms_db`.`department` (`name`) VALUES (?)', name);

}

async function getDepartment() {

    const db = await connect();

    const [departments] = await db.query('SELECT * FROM department');

    return departments;
}

module.exports = {

    getDepartment,
    addDepartment,

}