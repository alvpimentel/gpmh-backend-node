import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PesquisaController } from './pesquisas/pesquisa.controller';
import { PesquisaService } from './pesquisas/pesquisa.service';
import { Pesquisa } from './pesquisas/pesquisa.entity';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './data-source';
import { S3Module } from './s3/s3.module';
import { XlsxService } from './xlsx/xlsx.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      migrations: [],
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([Pesquisa]),
    S3Module,
  ],
  controllers: [PesquisaController],
  providers: [PesquisaService, XlsxService],
})
export class AppModule {}