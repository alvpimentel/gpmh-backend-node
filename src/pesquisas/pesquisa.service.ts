import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pesquisa } from './pesquisa.entity';
import { S3Service } from '@/s3/s3.service'; 
import { XlsxService } from '@/xlsx/xlsx.service';

@Injectable()
export class PesquisaService {
  constructor(
    @InjectRepository(Pesquisa)
    private readonly pesquisaRepository: Repository<Pesquisa>,
    private readonly s3Service: S3Service,
    private readonly xlsxService: XlsxService,
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

      // Gerar o arquivo XLSX com as pesquisas
      const fileBuffer = await this.xlsxService.generateXLSX(pesquisas);

      // Enviar o arquivo gerado para o S3
      const bucketName = process.env.AWS_BUCKET_NAME as string;
      const fileName = `pesquisas-${Date.now()}.xlsx`;
      await this.s3Service.uploadFile(bucketName, fileName, fileBuffer);

      return { criados, atualizados };
    });

    return { criados, atualizados };
  }

  async findByCodigo(codigo_pesquisa: string): Promise<Pesquisa | null> {
    return this.pesquisaRepository.findOne({ 
      where: { cd_pesquisa: codigo_pesquisa } 
    });
  }
}
