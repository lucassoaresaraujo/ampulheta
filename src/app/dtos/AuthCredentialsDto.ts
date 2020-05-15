import { IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  readonly login: string;

  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ example: 'AFS@#lksdl' })
  readonly password: string;
}
