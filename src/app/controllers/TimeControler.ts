import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UseGuards,
  Get,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { TimeService } from '../services/TimeService';
import { Time } from '../models/Time';
import { TimeDto } from '../dtos/TimeDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ListAll } from '../dtos/ListAll.dto';

@ApiTags('Time')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/time')
export class TimeController {
  constructor(private timeService: TimeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Time created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  async create(@Body() newTime: TimeDto): Promise<Time> {
    try {
      return await this.timeService.create(newTime);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':project_id')
  @ApiOkResponse({
    description: 'Show all times by projects',
    type: [Time],
  })
  async findAll(
    @Param('project_id', ParseIntPipe) projectId: number,
  ): Promise<ListAll<Time>> {
    const times = await this.timeService.findByProject(projectId);
    return { times };
  }
}
