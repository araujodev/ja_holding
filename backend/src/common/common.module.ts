import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AddressService } from './services/address.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [AddressService],
  exports: [AddressService],
})
export class CommonModule {}
