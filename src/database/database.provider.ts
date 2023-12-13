import { Sequelize } from 'sequelize-typescript';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.interface';
import { UserModel } from 'src/entities/user.entity';

let sequelize: Sequelize = null;

const models = [UserModel];

const databaseProviders: Provider[] = [
    {
        provide: 'SEQUELIZE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const databaseConfig =
                configService.get<DatabaseConfig>('database');
            initDatabase(databaseConfig).catch((err) => {
                console.log('can not init database', err);
                process.abort();
            });
        },
    },
];

async function initDatabase(databaseConfig: DatabaseConfig) {
    sequelize = new Sequelize({
        ...databaseConfig,
        dialect: 'mysql',
        dialectOptions: {
            supportBigNumbers: true,
        },
        //   pool: DB_POOL_CONFIG,
        logging: false,
    });

    // sequelize model
    sequelize.addModels(models);

    console.log('Init database done');

    //   return await sequelize.sync().then(async () => {
    //     console.log('generate database done');
    //   });
}

export { databaseProviders, sequelize };
