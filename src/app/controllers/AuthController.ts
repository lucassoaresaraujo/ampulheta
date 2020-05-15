import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from '../services/AuthService';
import { TokenDto } from '../dtos/Token.dto';
import { AuthCredentialsDto } from '../dtos/AuthCredentialsDto';

@ApiTags('Authenticate')
@Controller('api/v1/authenticate')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Authentication succeeded.',
  })
  @ApiUnauthorizedResponse({
    description: 'User not found or invalid password',
  })
  async create(@Body() authCredentials: AuthCredentialsDto): Promise<TokenDto> {
    try {
      return await this.authService.authenticate(authCredentials);
    } catch (error) {
      throw error;
    }
  }
}
