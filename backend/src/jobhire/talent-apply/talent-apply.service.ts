import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TalentApply } from 'output/entities/TalentApply';
import { TalentApplyProgress } from 'output/entities/TalentApplyProgress';
import { Repository } from 'typeorm';
import { CreateTalentApplyDto } from '../dto/create-talentapply.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TalentApplyService {
  constructor(
    @InjectRepository(TalentApply)
    private readonly talentApplyRepo: Repository<TalentApply>,
    @InjectRepository(TalentApplyProgress)
    private readonly applyProgressRepo: Repository<TalentApplyProgress>,
    private readonly userService: UsersService,
  ) {}

  async FindAll() {
    return await this.talentApplyRepo.find({
      relations: ['taapEntity', 'taapUserEntity', 'talentApplyProgresses'],
    });
  }

  async FindOne(userEntityId: number, jobEntityId: number) {
    return await this.talentApplyRepo.findOne({
      where: {
        taapUserEntityId: userEntityId,
        taapEntityId: jobEntityId,
      },
      relations: {
        taapStatus: true,
        talentApplyProgresses: true,
      }
    });
  }

  async Create(
    newApply: CreateTalentApplyDto,
    resume: Express.Multer.File,
    photo: Express.Multer.File,
  ) {
    try {
      const isExist = await this.FindOne(
        newApply.userEntityId,
        newApply.jobEntityId,
      );

      if (isExist)
        throw new BadRequestException('you already apply to this job');

      const userApply = await this.userService.UpdateUserApply(
        newApply,
        resume,
        photo,
      );
      const talentApply = await this.talentApplyRepo.save({
        taapUserEntityId: newApply.userEntityId,
        taapEntityId: newApply.jobEntityId,
      });
      const applyProgress = await this.applyProgressRepo.save({
        taapUserEntityId: newApply.userEntityId,
        taapEntityId: newApply.jobEntityId,
        taprProgressName: 'Apply Application',
        taprStatus: 'waiting',
      });
      return { talentApply, applyProgress, userApply };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
