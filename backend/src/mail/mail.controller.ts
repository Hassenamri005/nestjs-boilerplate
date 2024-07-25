import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResponseDto } from 'src/utils/response.dto';
import { EmailDTO } from './dto/email.dto';

@Controller('mail')
@ApiTags('mail')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiOkResponse({
  description: 'mail response',
  type: ResponseDto,
})
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  create(@Body() emailDto: EmailDTO) {
    return this.mailService.sendEmail(emailDto);
  }
}
