import { IsNotEmpty, IsDefined } from 'class-validator';
import { CreatedUser } from './CreatedUserDto';

export class TokenDto {
  @IsNotEmpty()
  @IsDefined()
  readonly token: string;

  @IsDefined()
  readonly user: CreatedUser;
}
