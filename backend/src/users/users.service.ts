import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { UsersEducation } from 'output/entities/UsersEducation';
import { UsersMedia } from 'output/entities/UsersMedia';
import { UsersPhones } from 'output/entities/UsersPhones';
import { extname } from 'path';
import { UpdateTalentApplyDto } from 'src/jobhire/dto/update-talentapply.dto';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    @InjectRepository(UsersMedia) private userMediaRepo: Repository<UsersMedia>,
    @InjectRepository(UsersEducation)
    private userEducationRepo: Repository<UsersEducation>,
    @InjectRepository(UsersPhones)
    private userPhoneRepo: Repository<UsersPhones>,
  ) {}

  async FindOne(userEntityId: number) {
    return await this.usersRepo.findOne({
      where: { userEntityId },
      relations: {
        usersEducations: true,
        usersPhones: {
          uspoPontyCode: true,
        },
      },
    });
  }

  async FindResume(usmeEntityId: number) {
    return await this.userMediaRepo.findOne({
      where: { usmeEntityId, usmeNote: Like('cv') },
    });
  }

  async UpdateUserApply(
    updateData: UpdateTalentApplyDto,
    resume: Express.Multer.File,
    photo: Express.Multer.File,
  ) {
    try {
      const indexofspace = updateData.fullName?.indexOf(' ');
      const updateUser = this.usersRepo.create({
        userEntityId: updateData.userEntityId,
        userFirstName: updateData.fullName?.slice(0, indexofspace),
        userLastName: updateData.fullName?.slice(indexofspace + 1),
        userBirthDate: updateData.birthDate,
        userPhoto: photo?.[0]?.filename,
      });

      const updateEducation = this.userEducationRepo.create({
        usduId: updateData.usduId,
        usduEntityId: updateData.userEntityId,
        usduDegree: updateData.degree,
        usduSchool: updateData.school,
        usduFieldStudy: updateData.fieldStudy,
      });

      let updatePhone: any;
      if (updateData.phone) {
        updatePhone = await this.userPhoneRepo.save({
          uspoEntityId: updateData.userEntityId,
          uspoNumber: updateData.phone,
          uspoPontyCode: { pontyCode: 'Cell' },
        });
      } else if (updateData.phone && updateData.oldPhone) {
        updatePhone = await this.userPhoneRepo.update(
          {
            uspoEntityId: updateData.userEntityId,
            uspoNumber: updateData.oldPhone,
          },
          {
            uspoNumber: updateData.phone,
          },
        );
      }

      let updateResume: UsersMedia, saveUserMedia: UsersMedia;
      if (resume) {
        const userMedia = await this.FindResume(updateData.userEntityId);
        updateResume = this.userMediaRepo.create({
          usmeId: userMedia?.usmeId,
          usmeEntityId: userMedia?.usmeEntityId || updateData.userEntityId,
          usmeFilename: resume[0].filename,
          usmeFilesize: resume[0].size,
          usmeFiletype: extname(resume[0].filename).replace('.', ''),
          usmeFileLink: `http://localhost:3001/api/users/resume/${resume[0].filename}`,
          usmeNote: userMedia?.usmeNote || 'cv',
        });
        saveUserMedia = await this.userMediaRepo.save(updateResume);
      }

      const saveUser = await this.usersRepo.save(updateUser);
      const saveEdu = await this.userEducationRepo.save(updateEducation);
      saveUser.usersEducations = [saveEdu];
      saveUser.usersPhones = [updatePhone];

      return { resume: saveUserMedia, user: saveUser };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
