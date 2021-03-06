import path from 'path';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import './env';
import './db';
import routes from './routes';
import session from 'express-session';
import logger from './utils/logger';
const app = express();

const APP_PORT = (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

//app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

// app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit:'20mb'}));

app.use(session({
    secret  : 'MYSUPERSECRET',
    resave: false,
    saveUninitialized: true,
    maxAge:new Date(Date.now() + (60 * 1000 * 2))
}));


// view engine setup
app.set('views',path.join(__dirname,'../views/'));
app.set('view engine', 'ejs');

app.use('/public/stylesheets',express.static(path.join(__dirname,'../public/stylesheets')));
app.use('/public/javascripts',express.static(path.join(__dirname,'../public/javascripts')));
app.use('/public/images',express.static(path.join(__dirname,'../public/images')));


app.use('/', routes);


app.listen(app.get('port'), app.get('host'), () => {
    logger.info(`Server started at https://${app.get('host')}:${app.get('port')}`);
});

export default app;
