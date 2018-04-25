const app                     = require('express')();
const session                 = require('express-session');
const bodyParser              = require('body-parser');
const authMiddleware          = require('./middlewares/authMiddleware');
const registerLoginMiddleware = require('./middlewares/registerLoginMiddleware');
const routeIndex              = require('./routes');
const routeRegister           = require('./routes/register');
const routeLogin              = require('./routes/login');
const routeLogout             = require('./routes/logout');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(session({
  secret: 'sdhfkasdhfksabdf',
  resave: false,
  saveUninitialized: true
}))

app.use('/register', registerLoginMiddleware);

app.use('/login', registerLoginMiddleware);

app.use('/register', routeRegister);

app.use('/login', routeLogin);

app.use('/', authMiddleware);

app.use('/', routeIndex);

app.use('/logout', routeLogout);

app.listen(3000, console.log('Listen on port 3000'))