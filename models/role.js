const { connect } = require("../db/connect")


async function addRole(name, salary) {

    const db = await connect();

    await db.query('INSERT INTO `employee_cms_db`.`role` (`title`, `salary`) VALUES (?, ?)', name, salary);

}

async function getRole() {

    const db = await connect();

    const [role] = await db.query('SELECT * FROM role');

    return role;
}

module.exports = {

    getRole,
    addRole,

}