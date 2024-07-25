import { Injectable } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as pdf from 'html-pdf';
import * as path from 'path';
import * as fs from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GeneratePdfService {
  constructor(private prisma: PrismaService) {}
  async generatePdf(
    data: any,
    template_name: string,
    saved_file_name: string,
    save: boolean = false,
  ): Promise<Buffer> {
    try {
      // Read HTML template file
      const htmlPath = path.join(__dirname, '../../templates', template_name);
      const html = fs.readFileSync(htmlPath, 'utf-8');

      // Compile HTML template
      const template = handlebars.compile(html);

      // Inject data into template
      const compiledHtml = template(data);

      // Convert HTML to PDF buffer
      const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
        pdf.create(compiledHtml).toBuffer((err, buffer) => {
          if (err) {
            console.error('PDF Creation Error:', err);
            reject(err);
          } else {
            resolve(buffer);
          }
        });
      });

      // Save generated PDF buffer in pdf file if save is true
      if (save) {
        const filePath = path.join(
          __dirname,
          '../../../generatedFiles',
          saved_file_name,
        );
        await fs.writeFileSync(filePath, pdfBuffer, { flag: 'w' });
      }

      return pdfBuffer;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }
}
