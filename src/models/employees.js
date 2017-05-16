import db from '../db';

const tableName = 'tblEmployees';
/**
 * Get all Employees data and departments data
 * @param done callback
 *
 * @return err|array
 * */
exports.getAll = (done) => {
    db.get().query(`SELECT * from ${tableName} JOIN tblDepartments on dpID = emp_dpID`, (err, employees) => {
        if (err) {
            done(err);
        }

        done(null, employees);
    })
};
/**
 * Get Employee by id
 * @param id int
 * @param done callback
 *
 * @return err|array
 * */
exports.getById = (id, done) => {
    db.get().query(`SELECT * FROM ${tableName} WHERE empID = ?`, id, (err, employee) => {
        if (err) {
            done(err);
        }

        done(null, employee[0]);
    });
};
/**
 * Update Employee data by id
 * @param data array
 * @param done callback
 *
 * @return err|array
 * */
exports.updateById = (data, done) => {
    db.get().query(`UPDATE ${tableName} SET empName = ?, empActive = ?, emp_dpID = ? WHERE empID = ?`, data, (err, employee) => {
        if (err) {
            done(err)
        }

        done(null, employee);
    });
};

/**
 * Delete all Employee data by id
 * @param id int
 * @param done callback
 *
 * @return err|array
 * */
exports.deleteById = (id, done) => {
    db.get().query(`DELETE FROM ${tableName} WHERE empID = ? `, id, (err, data) => {
        if (err) {
            done(err)
        }

        done(null, data);
    });
};