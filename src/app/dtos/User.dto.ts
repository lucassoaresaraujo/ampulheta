import {
  IsEmail,
  IsNotEmpty,
  IsDefined,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(150)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(20)
  readonly login: string;

  @IsString()
  @IsDefined()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  }) // strong password regex: Passwords will contain at least 1 upper case letter, at least 1 lower case letter, at least 1 number or special character
  readonly password: string;
}
