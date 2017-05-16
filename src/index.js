import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import db from './db';

const app = express();
const port = process.env.port || 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(__dirname + '/../public'));
app.use(routes);

app.set('view engine', 'pug');
app.set('views', __dirname + '/../public/views');

// Connect to MySQL on start
db.connect(err => {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit(1)
    } else {
        app.listen(port, () => {
            console.log('Magic on port', port);
        });
    }
});

//Trigger 404 error
global.catch404Error = (res) => {
    res.status(404);
    res.render('error', {err: {message: 'Page not found'}});
    return false;
};
//Trigger system error
global.catchSystemError = (err, res) => {
    res.status(500);
    res.render('error', {err: {message: err.message}});
    return false;
};

export default app;
