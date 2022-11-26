import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class MeController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@Request() req: any) {
    return req.user;
  }
}
