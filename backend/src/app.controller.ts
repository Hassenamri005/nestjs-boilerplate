import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileUploadTypeSchema, editFileName } from './utils/upload-file.helper';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ResponseDto } from './utils/response.dto';

const UPLOADED_FILES_PATH = './uploadedFiles';
@Controller()
@ApiOkResponse({
  description: 'response',
  type: ResponseDto,
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Upload an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: FileUploadTypeSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOADED_FILES_PATH,
        filename: editFileName,
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }), // file should have a size <me 1 MO
          new FileTypeValidator({ fileType: /image\/(jpeg|jpg|png)/ }),
          // fileType: /image\/(jpeg|jpg|png)|application\/pdf/, authorize upload pdf files also
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return { filename: file?.filename, type: file?.mimetype };
  }

  @Get('files/:filepath')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Visualize uploaded file' })
  seeUploadedFile(@Param('filepath') file: string, @Res() res) {
    return res.sendFile(file, { root: UPLOADED_FILES_PATH });
  }
}
