import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PesquisaController } from './pesquisas/pesquisa.controller';
import { PesquisaService } from './pesquisas/pesquisa.service';
import { Pesquisa } from './pesquisas/pesquisa.entity';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      migrations: [],
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([Pesquisa]),
  ],
  controllers: [PesquisaController],
  providers: [PesquisaService],
})
export class AppModule {}