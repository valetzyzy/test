import mysql from 'mysql';
import dbConfig from './config/db';

const state = {
    pool: null
};

exports.connect = (done) => {
    state.pool = mysql.createPool(dbConfig);
    done()
};

exports.get = () => {
    return state.pool
};