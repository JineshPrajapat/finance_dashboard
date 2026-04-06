// import { Controller, Post, Body, Delete, Param, ParseIntPipe } from '@nestjs/common';
// import { SessionsService } from './sessions.service';
// import { RefreshSessionDto } from './dto/refresh-session.dto';
// import { ApiTags, ApiOperation } from '@nestjs/swagger';

// @ApiTags('Sessions')
// @Controller('sessions')
// export class SessionsController {
//   constructor(private readonly service: SessionsService) {}

//   @Post('refresh')
//   @ApiOperation({ summary: 'Validate refresh token' })
//   refresh(@Body() dto: RefreshSessionDto) {
//     return this.service.validateSession(dto.refresh_token);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Revoke session' })
//   revoke(@Param('id', ParseIntPipe) id: number) {
//     return this.service.revokeSession(id);
//   }
// }
