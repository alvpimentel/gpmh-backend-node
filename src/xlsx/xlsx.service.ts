import * as ExcelJS from 'exceljs';
import { Injectable } from '@nestjs/common';

// Serviço pra gerar planilha xlsx
@Injectable()
export class XlsxService {
  async generateXLSX(data: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Dados');

    // Cabeçalho da planilha
    worksheet.columns = Object.keys(data[0]).map((key) => ({
      header: key,
      key,
      width: 20,
    }));

    // Adiciona os dados na planilha
    data.forEach((item) => {
      worksheet.addRow(item);
    });

    // Buffer com a planilha gerada
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as Buffer;
  }
}
