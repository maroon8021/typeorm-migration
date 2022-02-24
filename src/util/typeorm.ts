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

export const typeormConfig = {
  type: 'postgres',
  entities: useTS
    ? ['src/domain/model/**/*.ts']
    : ['dist/domain/model/**/*.js'],

  //migrations: isDbMigration ? ['../../src/database/migration/**/*.ts'] : [],

  //logging: true,
  synchronize: false,

  host: DB_HOSTNAME as string,
  port: Number(DB_PORT || '5432'),
  username: DB_USERNAME as string,
  password: DB_PASSWORD as string,
  database: DB_NAME as string,
};
