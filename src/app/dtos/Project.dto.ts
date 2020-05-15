import { IsNotEmpty, IsDefined, IsString, MaxLength } from 'class-validator';

export class ProjectDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(150)
  readonly title: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(250)
  readonly description: string;

  @IsDefined()
  @IsNotEmpty()
  readonly user_id: number[];
}
