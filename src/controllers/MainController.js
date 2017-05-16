import Employees from '../models/employees';
import Departments from '../models/departments';
import _ from 'underscore';

export class MainController {
    /**
     * Index page with all Employees
     * @param req Request
     * @param res Response
     *
     * @return sting
     * */
    index(req, res) {
        Employees.getAll((err, employees) => {
            if (err) {
                global.catchSystemError(err, res);
            }

            res.render('main/index.pug', {employees: employees});
        });
    }
    /**
     * Edit page with Employee data
     * @param req Request
     * @param res Response
     *
     * @return sting
     * */
    edit(req, res) {
        Employees.getById(req.params.id, (err, employee) => {
            if (err) {
                global.catchSystemError(err, res);
            }

            if (_.isUndefined(employee)) {
                global.catch404Error(res);
            }

            Departments.getAll((err, departments) => {
                res.render('main/edit.pug', {employee: employee, departments: departments});
            });
        });
    }
    /**
     * Edit Employees data
     * @param req Request
     * @param res Response
     *
     * @return sting
     * */
    editData(req, res) {
        let updateData = [
            req.body.empName,
            req.body.empActive,
            req.body.emp_dpID,
            req.params.id
        ];
        Employees.updateById(updateData, (err, employee) => {
            if (err) {
                global.catchSystemError(err, res);
            }

            if (_.isUndefined(employee)) {
                global.catch404Error(res);
            }

            res.redirect('/');
        });
    }
    /**
     * Delete Employees with all data
     * @param req Request
     * @param res Response
     *
     * @return sting
     * */
    delete(req, res) {
        Employees.deleteById(req.body.id, (err, data) => {
            if (err) {
                res.json({status: false, message: err.message});
            }

            if (_.isUndefined(data)) {
                res.json({status: false, message: 'Not found'});
            }

            res.json({status: true});
        });
    }
}
