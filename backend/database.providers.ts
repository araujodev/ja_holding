import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'project_postgres',
        port: 5432,
        username: 'postgres',
        password: '12345678',
        database: 'base_project',
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
