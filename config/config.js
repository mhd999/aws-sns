require('dotenv').config();

const config = {
  development: {
    DB_URL: process.env.DB_URL,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  },
  test: {

  },
  production: {
    DB_URL: '',
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports = config.production;
} else if (process.env.NODE_ENV === 'test') {
  module.exports = config.test;
} else {
  module.exports = config.development;
}
