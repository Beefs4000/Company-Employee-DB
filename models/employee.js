const { connect } = require("../db/connect")


// Add new employee
async function addEmployee(firstName, lastName, roleID, managerID) {
    const db = await connect();
    // Array of inputs to protect from sql injection
    const inputs = [firstName, lastName, roleID, managerID];
    // Query the db with inputs
    await db.query(
      "INSERT INTO `company_db`.`employees` (`first_name`, `last_name`, `role_id`,`manager_id`) VALUES (?,?,?,?)",
      inputs
    );
  }

  async function updateEmployee(firstName, lastName, roleID, managerID, employeeID) {

    const db = await connect();
  
    // Input array for each potential change
    const nameChangeParam = [firstName, lastName, employeeID];
    const roleChangeParam = [roleID, employeeID];
    const managerChangeParam = [managerID, employeeID];
  
    // Query input variables
    const nameQueryString ="UPDATE employees SET `first_name` = ?, `last_name` = ? WHERE id = ?";
    const roleQueryString = "UPDATE employees SET `role_id` = ? WHERE id = ?";
    const managerQueryString = "UPDATE employees SET `manager_id` = ? WHERE id = ?";
  
    // If the function passed a name, run the name change query
    if (firstName) { await db.query(nameQueryString, nameChangeParam) };
  
    // If the function is passed a roleID run the role change query
    if (roleID) { await db.query(roleQueryString, roleChangeParam) };
    
    // If the function is passed a managerID, run manager change query
    if (managerID) { await db.query(managerQueryString, managerChangeParam) };
  }
  
  // Delete employee by ID
  async function deleteEmployee(employeeID) {
  
    const db = await connect();
  
    const deleteQuery = "DELETE FROM `company_db`.`employees` WHERE id = ?";
  
    await db.query(deleteQuery, employeeID)
  }


// Gets the current list of employees
async function getEmployees() {
    const db = await connect();
    const [employees] = await db.query("SELECT * FROM employees");
    return employees;
  }

module.exports = {

    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee

}