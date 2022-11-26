import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { MessageHelper } from '../helpers/message.helper';

export interface IntegratorAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface IResponseAddress {
  postalCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

@Injectable()
export class AddressService {
  private baseUrl: string;
  private readonly extensionType: string = 'json';

  constructor(
    configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = configService.get('ADDRESS_FIND_ENDPOINT');
  }

  async findByZipCode(zipCode: string): Promise<IResponseAddress> {
    const completeUrl = `${this.baseUrl}${zipCode}/${this.extensionType}`;
    const address: IntegratorAddress = await firstValueFrom(
      this.httpService.get<IntegratorAddress>(completeUrl).pipe(
        map((res: any) => res?.data),
        catchError(() => {
          throw new Error(MessageHelper.ADDRESS_NOT_FOUND);
        }),
      ),
    );

    return {
      postalCode: address.cep,
      street: address.logradouro,
      complement: address.complemento,
      neighborhood: address.bairro,
      city: address.localidade,
      state: address.uf,
    } as IResponseAddress;
  }
}
