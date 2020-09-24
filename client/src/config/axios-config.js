import axios from 'axios';

const token = localStorage.getItem('token');
if (token === null || token === undefined) {
    axios.defaults.headers.authorization = '';
} else {
    axios.defaults.headers.authorization = 'Bearer ' + JSON.parse(token);
}

