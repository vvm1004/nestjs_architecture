import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-option.interface';

@Module({
 
})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports = options.driver === 'orm'
      ? [
          TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              type: 'mysql',
              host: configService.get('DB_HOST'),
              port: configService.get('DB_PORT'),
              username: configService.get('DB_USERNAME'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get('DB_DATABASE'),
              autoLoadEntities: true,
              synchronize: true,
            }),
          }),
          MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              uri: configService.get('MONGO_URI'),
            }),
          }),
        ]
      : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
