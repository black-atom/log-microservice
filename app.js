import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import databaseConnection from './databaseConnection'
import monitoramentoRouter from './api/routes/monitoramentoRouter'
import jwt from 'express-jwt';
import { getAuthConfig } from './config/authConfig'

const authConfig = getAuthConfig()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use("/api", 
  jwt({
    secret: authConfig.secret,
    credentialsRequired: !authConfig.bypass
  }), 
  (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { 
      return(res.status(401).send('Invalid authorization token'));
    }
  }
);
app.use(morgan('dev'))
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api", (req, res, next) => {

    req.body.createdBy = (req.user && req.user._doc.login.username) ? req.user._doc.login.username : 'Ambiente de Test';
    req.body.updatedBy = (req.user && req.user._doc.login.username) ? req.user._doc.login.username : 'Ambiente de Test';
    
     next();
})
  

app.use('/api', monitoramentoRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : err;

    console.error(err.stack || err)
    // render the error page
    res.status(err.status || 500);
    res.json(res.locals.error);
});

app.listen(port, () => console.log('Running ...'))

export { app, port }
