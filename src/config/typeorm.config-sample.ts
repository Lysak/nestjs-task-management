import {TypeOrmModuleOptions} from '@nestjs/typeorm';

// it's a sample file

// if have error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'taskmanagment',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // disable in prod
}


