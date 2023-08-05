import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'output/entities/Client';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { Address } from 'output/entities/Address';
import { UpdateClientDto } from './dto/update-client.dto';
import { EmployeeRangeService } from '../employee-range/employee-range.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private readonly employeeRangeService: EmployeeRangeService,
  ) {}

  async FindAll() {
    return await this.clientRepository.find({
      relations: {
        clitAddr: {
          addrCity: {
            cityProv: {
              provCountryCode: true,
            },
          },
        },
        clitEmra: true,
      },
    });
  }

  async FindOne(clitId: number) {
    const client = await this.clientRepository.findOne({
      where: { clitId },
      relations: {
        clitAddr: {
          addrCity: {
            cityProv: {
              provCountryCode: true,
            },
          },
        },
        clitEmra: true,
      },
    });

    if (!client)
      throw new NotFoundException(`Client with id ${clitId} is not exist`);

    return client;
  }

  async Create(createClientDto: CreateClientDto) {
    try {
      const address = await this.addressRepository.findOneBy({
        addrId: createClientDto.addressId,
      });
      const emra = await this.employeeRangeService.FindOne(
        createClientDto.empRangeId,
      );

      return await this.clientRepository.save({
        clitId: createClientDto.id,
        clitName: createClientDto.name,
        clitAbout: createClientDto.about,
        clitAddr: address,
        clitEmra: emra,
      });
    } catch (error) {
      return error.message;
    }
  }

  async Update(clitId: number, updateClientDto: UpdateClientDto) {
    const address = await this.addressRepository.findOneBy({
      addrId: updateClientDto.addressId,
    });

    const emra = await this.employeeRangeService.FindOne(
      updateClientDto.empRangeId,
    );

    if (!address || !emra)
      throw new BadRequestException('address id or emp range id not exist');

    const updated = await this.clientRepository.update(clitId, {
      clitName: updateClientDto.name,
      clitAbout: updateClientDto.about,
      clitAddr: address,
      clitEmra: emra,
    });

    if (updated.affected === 0)
      throw new NotFoundException(`Client with id ${clitId} is not exist`);

    return updated;
  }

  async Delete(clitId: number) {
    const deleted = await this.clientRepository.delete(clitId);

    if (deleted.affected === 0)
      throw new NotFoundException('nothing to delete');

    return deleted;
  }
}
