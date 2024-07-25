import { ApiProperty } from '@nestjs/swagger';

export class UserDispoDTO {
  @ApiProperty()
  goingTo?: string;

  @ApiProperty()
  startDay?: string;

  @ApiProperty()
  endDay?: string;

  @ApiProperty()
  startAt?: string;

  @ApiProperty()
  endAt?: string;

  @ApiProperty()
  comment?: string;
}
export class UserDTO {
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

  @ApiProperty({ type: () => Number, required: false })
  companyTypeId?: number | null;

  @ApiProperty({ type: () => Number, required: false })
  userPackId?: number | null;

  @ApiProperty()
  carNumber?: string;

  @ApiProperty()
  carTypeId?: number;

  @ApiProperty()
  carWidth?: number;

  @ApiProperty()
  carHeight?: number;

  @ApiProperty()
  carWeight?: number;

  @ApiProperty({ type: () => UserDispoDTO, isArray: false })
  disponibility?: UserDispoDTO | undefined;

  @ApiProperty()
  verified?: boolean;
}
