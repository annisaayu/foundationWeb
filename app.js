const app                     = require('express')();
const session                 = require('express-session');
const bodyParser              = require('body-parser');
const authMiddleware          = require('./middlewares/authMiddleware');
const registerLoginMiddleware = require('./middlewares/registerLoginMiddleware');
const userMiddleware          = require('./middlewares/userMiddleware')
const foundationMiddleware    = require('./middlewares/foundationMiddleware')
const routeIndex              = require('./routes');
const routeRegister           = require('./routes/register');
const routeLogin              = require('./routes/login');
const routeLogout             = require('./routes/logout');
const routeUser               = require('./routes/user');
const routeFoundation         = require('./routes/foundation');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.locals.selectedForm = require('./helpers/selectedForm');

app.locals.toRupiah = require('./helpers/toRupiah');

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

app.use('/user', userMiddleware);

app.use('/user', routeUser);

app.use('/', routeIndex);

app.use('/foundation', foundationMiddleware);

app.use('/foundation', routeFoundation);

app.use('/', routeIndex);

app.use('/logout', routeLogout);

app.listen(3000, console.log('Listen on port 3000'))
