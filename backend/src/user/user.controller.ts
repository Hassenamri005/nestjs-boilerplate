import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../utils/response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'users response',
    type: ResponseDto,
  })
  create(@Body() createUserDto: UserDTO) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'users response',
    type: ResponseDto,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(3)
  @ApiOkResponse({
    description: 'users response',
    type: ResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'users response',
    type: ResponseDto,
  })
  update(@Param('id') id: string, @Body() userDto: UserDTO) {
    return this.userService.updateUser(+id, userDto);
  }

  @Patch('verfieUser/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'users response',
    type: ResponseDto,
  })
  verifieUser(@Param('id') id: string) {
    return this.userService.verifie(+id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'users response',
    type: ResponseDto,
  })
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
