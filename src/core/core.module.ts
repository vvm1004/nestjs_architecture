import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-option.interface';

@Module({})
export class CoreModule {
    static forRoot(options: ApplicationBootstrapOptions){
        const imports =
            options.driver === 'orm'
                ? [
                    TypeOrmModule.forRoot({
                        type: 'mysql',
                        host: 'localhost',
                        port: 3306,
                        username: 'root',
                        password: 'root',
                        database: 'learning',
                        autoLoadEntities: true,
                        synchronize: true
                    }),
                ]
                : [];

            return {
                module: CoreModule,
                imports
            }
    }
}
// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-option.interface';

// @Module({
//   imports: [ConfigModule],  // Import ConfigModule
// })
// export class CoreModule {
//   static forRoot() {
//     return {
//       module: CoreModule,
//       imports: [
//         // Inject ConfigService to read environment variables or config values
//         TypeOrmModule.forRootAsync({
//           imports: [ConfigModule],
//           useFactory: async (configService: ConfigService) => {
//             const driver = configService.get<string>('DATABASE_DRIVER');  // Get driver from env/config
//             if (driver === 'orm') {
//               return {
//                 type: 'mysql',
//                 host: configService.get<string>('DATABASE_HOST', 'localhost'),
//                 port: configService.get<number>('DATABASE_PORT', 3306),
//                 username: configService.get<string>('DATABASE_USERNAME', 'root'),
//                 password: configService.get<string>('DATABASE_PASSWORD', 'root'),
//                 database: configService.get<string>('DATABASE_NAME', 'learning'),
//                 autoLoadEntities: true,
//                 synchronize: true,
//               };
//             } else {
//               return {};  // Return empty object or some default if the driver is not 'orm'
//             }
//           },
//           inject: [ConfigService],
//         }),
//       ],
//     };
//   }
// }
