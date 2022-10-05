const { connect } = require("../db/connect")


async function addEmployee(name, salary) {

    const db = await connect();

    await db.query('INSERT INTO `employee_cms_db`.`role` (`title`, `salary`) VALUES (?)', name, salary);

}

async function updateEmployee(name, salary) {

  
}


async function getEmployee() {

    const db = await connect();

    const [role] = await db.query('SELECT * FROM role');

    return role;
}

module.exports = {

    getEmployee,
    addEmployee,
    updateEmployee,

}