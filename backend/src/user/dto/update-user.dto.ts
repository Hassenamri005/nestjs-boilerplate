import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  firstName?: string | null;

  @ApiProperty()
  lastName?: string | null;

  @ApiProperty()
  phone?: string | null;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ type: () => Number, required: false })
  roleId?: number; // Adjust according to Prisma schema

  @ApiProperty({ required: false })
  companyName?: string | null;

  @ApiProperty({ required: false })
  city?: string | null;

  @ApiProperty({ required: false })
  country?: string | null;

  @ApiProperty({ required: false })
  address?: string | null;

  @ApiProperty({ required: false })
  websiteUrl?: string | null;

  @ApiProperty({ required: false })
  commercialRegister?: string | null;

  @ApiProperty({ required: false })
  patent?: string | null;

  @ApiProperty()
  companyTypeId?: number | null;

  @ApiProperty()
  userPackId?: number | null;

  @ApiProperty()
  verified?: boolean | null;
}
