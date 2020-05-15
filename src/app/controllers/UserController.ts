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
  UseGuards,
} from '@nestjs/common';
import { UserDto } from '../dtos/User.dto';
import { UserService } from '../services/UserService';
import { User } from '../models/User';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiConflictResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreatedUser } from '../dtos/CreatedUserDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'User created successfully.',
  })
  @ApiConflictResponse({
    description: 'This email or login already exists',
  })
  async create(@Body() newUser: UserDto): Promise<CreatedUser> {
    try {
      return await this.userService.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'User found',
    type: User,
  })
  async show(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUser: UserDto,
  ): Promise<CreatedUser> {
    return await this.userService.update(id, updatedUser);
  }
}
