const app = require ('express')();
const bodyParser = require ('body-parser');
const routes = require ('./routes');

app.locals.selectedForm = require ('./helpers/selectedForm')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', routes)

app.listen(3000, () => {
  console.log('Server Listen on port 3000')
})
