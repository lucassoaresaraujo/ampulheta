import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Param,
  Get,
  Put,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { ProjectService } from '../services/ProjectService';
import { ProjectDto } from '../dtos/Project.dto';
import { Project } from '../models/Project';
import { ListAll } from '../dtos/ListAll.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Project')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Project created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  async create(@Body() newProject: ProjectDto): Promise<Project> {
    try {
      return await this.projectService.create(newProject);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Project found',
    type: Project,
  })
  async show(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return await this.projectService.findByIdWithUsers(id);
  }

  @Get()
  @ApiOkResponse({
    description: 'Show all projects',
    type: [Project],
  })
  async findAll(): Promise<ListAll<Project>> {
    const projects = await this.projectService.findAll();
    return { projects };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() projectData: ProjectDto,
  ): Promise<Project> {
    return await this.projectService.update(id, projectData);
  }
}
