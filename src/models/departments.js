import db from '../db';

const tableName = 'tblDepartments';


exports.getAll = (done) =>  {
    db.get().query(`SELECT * FROM ${tableName}`, (err, data) => {
        if (err) {
            done(err);
        }

        done(null, data);
    });
};