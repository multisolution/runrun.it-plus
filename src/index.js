const settings = require('../settings')

const Raven = require('raven')
Raven.config(settings.sentry.dsn).install();

require('./documents')
