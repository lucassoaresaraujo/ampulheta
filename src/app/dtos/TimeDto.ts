import { IsDefined, IsInt, IsISO8601 } from 'class-validator';

export class TimeDto {
  @IsInt()
  @IsDefined()
  readonly project_id: number;

  @IsDefined()
  @IsISO8601({ strict: true }) // Checks if the string is a valid ISO 8601 date, e.g. invalidates dates like 2019-02-29
  readonly started_at: Date;

  @IsDefined()
  @IsISO8601({ strict: true }) // Checks if the string is a valid ISO 8601 date, e.g. invalidates dates like 2019-02-29
  readonly ended_at: Date;
}
