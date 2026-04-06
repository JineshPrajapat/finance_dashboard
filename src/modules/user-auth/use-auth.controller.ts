import {
  Body,
  Controller,
  Post,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserLoginDto } from './dto/user-login.dto';
import { RefreshSessionDto } from './user_sessions/dto/refresh-session.dto';
import { UserLoginResponseDto } from './dto/response/user-login-response.dto';

@ApiTags('User/auth')
@ApiSecurity('app-token')
@Controller('user/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: UserLoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials or missing fields',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async login(@Body() body: UserLoginDto, @Req() req: Request) {
    const response = await this.userAuthService.login(
      body.email,
      body.password,
    );

    if (response.code !== 200) {
      throw new BadRequestException(response.message);
    }

    return response;
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({
    status: 400,
    description: 'Invalid refresh token or missing fields',
  })
  async refreshAccessToken(@Body() refreshSessionDto: RefreshSessionDto) {
    return await this.userAuthService.refreshAccessToken(
      refreshSessionDto.refresh_token,
    );
  }
}
