import { Controller, Get, Res } from '@nestjs/common';
import { GeneratePdfService } from './generate-pdf.service';
import { ApiTags } from '@nestjs/swagger';
import * as path from 'path';

@Controller('generate-pdf')
@ApiTags('generate-pdf')
export class GeneratePdfController {
  constructor(private readonly generatePdfService: GeneratePdfService) {}

  @Get()
  async getPdf(@Res() res: any): Promise<void> {
    const data = {
      title: 'Sample Title',
      content: 'Sample Content',
    };

    try {
      // Generate PDF buffer
      const template_name = 'pdf-profile.hbs';
      const saved_file_name = 'output.pdf';
      await this.generatePdfService.generatePdf(
        data,
        template_name,
        saved_file_name,
      );
      const filePath = path.join(
        process.cwd(),
        './generatedFiles',
        saved_file_name,
      );

      // Set response headers
      res.setHeader('Content-Type', 'application/pdf');
      // Send the file as response
      return res.sendFile(filePath);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF');
    }
  }
}
