import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PesquisaService } from './pesquisa.service';

@Controller('pesquisas')
export class PesquisaController {
  constructor(private readonly pesquisaService: PesquisaService) {}

  // Inserir pesquisas recebidas em formato JSON
  @Post('create-multiple')
  async createOrUpdateMany(@Body() body: { codigo_pesquisa: string; nota_1: number; nota_2: number; media: number }[]) {
    try {
      const { criados, atualizados } = await this.pesquisaService.createOrUpdateMany(body);
      
      return {
        success: true,
        message: 'Pesquisas salvas com sucesso!',
        stats: {
          novosRegistros: criados,
          registrosAtualizados: atualizados
        },
        totalProcessado: criados + atualizados
      };
      
    } catch (error) {
      console.error('Erro ao processar pesquisas:', error);
      return {
        success: false,
        message: error.response?.message || 'Erro ao processar pesquisas',
        errorDetails: {
          code: error.code,
          details: error.response?.error || error.message
        }
      };
    }
  }

  // Buscar pesquisa por cd_pesquisa
  @Get(':codigo_pesquisa')
  async findByCodigo(@Param('codigo_pesquisa') codigo_pesquisa: string) {
    const pesquisa = await this.pesquisaService.findByCodigo(codigo_pesquisa);
    if (!pesquisa) {
      return {
        message: 'Pesquisa não encontrada',
        statusCode: 404
      };
    }
    return {
      message: 'Pesquisa encontrada!',
      data: pesquisa,
      statusCode: 200
    };
  }
}
