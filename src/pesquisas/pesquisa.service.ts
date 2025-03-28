import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pesquisa } from './pesquisa.entity';

@Injectable()
export class PesquisaService {
  constructor(
    @InjectRepository(Pesquisa)
    private readonly pesquisaRepository: Repository<Pesquisa>,
  ) {}

  // CRIA OU EDITA SE TIVER CODIGO DUPLICADO
  async createOrUpdateMany(
    pesquisas: { 
      codigo_pesquisa: string; 
      nota_1: number; 
      nota_2: number; 
      media: number 
    }[]
  ): Promise<{ criados: number; atualizados: number }> {
    let criados = 0;
    let atualizados = 0;

    await this.pesquisaRepository.manager.transaction(async (manager) => {
      for (const pesquisa of pesquisas) {
        try {
          // Verifica se já existe
          const existente = await manager.findOne(Pesquisa, {
            where: { cd_pesquisa: pesquisa.codigo_pesquisa }
          });

          if (existente) {
            // ATUALIZAÇÃO
            await manager.update(
              Pesquisa,
              { cd_pesquisa: pesquisa.codigo_pesquisa },
              {
                nr_nota1: pesquisa.nota_1,
                nr_nota2: pesquisa.nota_2,
                nr_media: pesquisa.media,
                dt_editado: new Date()
              }
            );
            atualizados++;
          } else {
            // CRIAÇÃO
            const novaPesquisa = manager.create(Pesquisa, {
              cd_pesquisa: pesquisa.codigo_pesquisa,
              nr_nota1: pesquisa.nota_1,
              nr_nota2: pesquisa.nota_2,
              nr_media: pesquisa.media
            });
            await manager.save(novaPesquisa);
            criados++;
          }
        } catch (error) {
          throw new ConflictException(
            `Falha ao processar pesquisa ${pesquisa.codigo_pesquisa}: ${error.message}`
          );
        }
      }
    });

    return { criados, atualizados };
  }

  async findByCodigo(codigo_pesquisa: string): Promise<Pesquisa | null> {
    return this.pesquisaRepository.findOne({ 
      where: { cd_pesquisa: codigo_pesquisa } 
    });
  }
}