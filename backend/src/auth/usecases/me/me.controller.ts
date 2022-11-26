import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('auth/me')
export class MeController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req: any) {
    return req.user;
  }
}
