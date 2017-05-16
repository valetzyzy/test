import express from 'express';
import {MainController} from './controllers/MainController';

const router = new express.Router();

//main page
router.get('/', (req, res) => {
    let c = new MainController();
    c.index(req, res);
});

//edit page and edit submit form
router.route('/edit/:id')
    .get((req, res) => {
        let c = new MainController();
        c.edit(req, res);
    })
    .post((req, res) => {
        let c = new MainController();
        c.editData(req, res);
    });

//delete
router.post('/delete', (req, res) => {
    let c = new MainController();
    c.delete(req, res);
});


export default router;
