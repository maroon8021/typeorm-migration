const path = require('path');
const {
  DB_MIGRATION,
  DB_HOSTNAME,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  IS_INSERT_FIXTURE,
} = process.env;

const isDbMigration = DB_MIGRATION === 'true';
const isInsertFixture = IS_INSERT_FIXTURE === 'true';
const useTS = isDbMigration || isInsertFixture;

const relativeToAbsolutePath = (relativePath) => {
  return path.join(__dirname, relativePath);
};

console.log('useTS', useTS);
console.log(
  "relativeToAbsolutePath('dist/domain/model/**/*.js')",
  relativeToAbsolutePath('dist/domain/model/**/*.js'),
);

module.exports = {
  type: 'postgres',
  entities: (useTS
    ? ['src/domain/model/**/*.ts']
    : ['dist/domain/model/**/*.js']
  ).map(relativeToAbsolutePath),
  migrations: isDbMigration ? ['src/database/migration/**/*.ts'] : [],

  logging: true,
  synchronize: false,

  host: DB_HOSTNAME,
  port: Number(DB_PORT || '5432'),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
};
