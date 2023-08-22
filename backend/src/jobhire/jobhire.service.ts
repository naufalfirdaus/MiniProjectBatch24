import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPost } from 'output/entities/JobPost';
import { Repository } from 'typeorm';
import { CreateJobPostDto } from './dto/create-jobpost.dto';
import { UpdateJobPostDto } from './dto/update-jobpost.dto';
import { JobPostDesc } from 'output/entities/JobPostDesc';
import { JobPhoto } from 'output/entities/JobPhoto';

@Injectable()
export class JobhireService {
  constructor(
    @InjectRepository(JobPost) private jobPostRepository: Repository<JobPost>,
    @InjectRepository(JobPostDesc)
    private jobPostDescRepository: Repository<JobPostDesc>,
    @InjectRepository(JobPhoto)
    private jobPhotoRepository: Repository<JobPhoto>,
  ) {}

  async FindAll() {
    return await this.jobPostRepository.find({
      relations: [
        'jobPhotos',
        'jobPostDesc',
        'jopoClit',
        'jopoAddr',
        'jopoJoro',
        'jopoJoca',
        'jopoJoty',
        'jopoEduCode',
        'jopoInduCode',
        'jopoStatus',
        'jopoWorkCode',
      ],
    });
  }

  async FindOne(jopoEntityId: number) {
    const jobPost = await this.jobPostRepository.findOne({
      where: { jopoEntityId },
      relations: {
        jobPhotos: true,
        jobPostDesc: true,
        jopoClit: true,
        jopoAddr: {
          addrCity: { cityProv: { provCountryCode: true } },
        },
        jopoJoro: true,
        jopoJoca: true,
        jopoJoty: true,
        jopoEduCode: true,
        jopoInduCode: true,
        jopoStatus: true,
        jopoWorkCode: true,
      },
    });

    if (!jobPost) throw new NotFoundException();

    return jobPost;
  }

  async Create(
    photos: Array<Express.Multer.File>,
    new_post: CreateJobPostDto,
    empId: number,
  ) {
    try {
      const jobPost = this.jobPostRepository.create({
        jopoNumber: new_post.jopo_number,
        jopoTitle: new_post.title,
        jopoMinSalary: new_post.min_sal,
        jopoMaxSalary: new_post.max_sal,
        jopoMinExperience: new_post.min_exp,
        jopoMaxExperience: new_post.max_exp,
        jopoPrimarySkill: new_post.primary_skill,
        jopoSecondarySkill: new_post.secondary_skill,
        jopoStartDate: new_post.start_date || null,
        jopoEndDate: new_post.end_date || null,
        jopoPublishDate: new_post.status === 'Publish' ? new Date() : null,
        jopoEmpEntity: { empEntityId: empId },
        jopoClit: { clitId: new_post.clit_id || null },
        jopoJoro: { joroId: new_post.joro_id || null },
        jopoJoty: { jotyId: new_post.joty_id || null },
        jopoJoca: { jocaId: new_post.joca_id || null },
        jopoAddr: { addrId: new_post.addr_id || null },
        jopoWorkCode: { wotyCode: new_post.work_code || null },
        jopoEduCode: { eduCode: new_post.edu_code || null },
        jopoInduCode: { induCode: new_post.indu_code || null },
        jopoStatus: { status: new_post.status },
      });

      const newJobPhotos = photos.map((photo) => {
        return this.jobPhotoRepository.create({
          jophoFilename: photo.filename,
          jophoFilesize: photo.size,
          jophoFiletype: photo.mimetype.split('/')[1],
        });
      });

      const newJobDesc = this.jobPostDescRepository.create({
        jopoDescription: new_post.des || null,
        jopoResponsibility: new_post.resp || null,
        jopoTarget: new_post.target || null,
        jopoBenefit: new_post.benefit || null,
      });

      jobPost.jobPostDesc = newJobDesc;
      jobPost.jobPhotos = newJobPhotos;

      return await this.jobPostRepository.save(jobPost);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async Update(
    jopoEntityId: number,
    updatedPost: UpdateJobPostDto,
    photos: Array<Express.Multer.File>,
  ) {
    try {
      const jobExist = await this.FindOne(jopoEntityId);
      if (!jobExist) throw new NotFoundException();

      const jobPost = this.jobPostRepository.create({
        jopoEntityId,
        jopoTitle: updatedPost.title,
        jopoStartDate: updatedPost.start_date,
        jopoEndDate: updatedPost.end_date,
        jopoMinSalary: updatedPost.min_sal,
        jopoMaxSalary: updatedPost.max_sal,
        jopoMinExperience: updatedPost.min_exp,
        jopoMaxExperience: updatedPost.max_exp,
        jopoPrimarySkill: updatedPost.primary_skill,
        jopoSecondarySkill: updatedPost.secondary_skill,
        jopoJoca: {
          jocaId: updatedPost.joca_id,
        },
        jopoJoty: {
          jotyId: updatedPost.joty_id,
        },
        jopoClit: {
          clitId: updatedPost.clit_id,
        },
        jopoAddr: {
          addrId: updatedPost.addr_id,
        },
        jopoStatus: {
          status: updatedPost.status,
        },
        jopoModifiedDate: new Date(),
      });

      if (jobExist.jopoStatus.status !== 'Publish') {
        jobPost.jopoPublishDate =
          updatedPost.status === 'Publish' && new Date();
      }

      const updateJobDesc = this.jobPostDescRepository.create({
        jopoDescription: updatedPost.des,
        jopoResponsibility: updatedPost.resp,
        jopoTarget: updatedPost.target,
        jopoBenefit: updatedPost.benefit,
      });

      jobPost.jobPostDesc = updateJobDesc;

      const parsedOldPhotoData =
        updatedPost.oldPhotoData && JSON.parse(updatedPost.oldPhotoData);
      if (updatedPost.removePhoto) {
        await this.jobPhotoRepository.delete(parsedOldPhotoData.jophoId);
      } else if (photos.length > 0) {
        jobPost.jobPhotos = [
          this.jobPhotoRepository.create({
            jophoId: parsedOldPhotoData?.jophoId,
            jophoFilename: photos[0].filename,
            jophoFilesize: photos[0].size,
            jophoFiletype: photos[0].mimetype.split('/')[1],
            jophoModifiedDate: new Date(),
          }),
        ];
      }

      return await this.jobPostRepository.save(jobPost);
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException('job not exist');
      throw new InternalServerErrorException(error.message);
    }
  }

  async Delete(id: number) {
    const deleted = await this.jobPostRepository.delete(id);

    if (deleted.affected === 0)
      throw new NotFoundException(`job post with id ${id} is not exist`);

    return deleted;
  }

  async GenerateJopoNumber() {
    const { jopoEntityId } = await this.jobPostRepository
      .createQueryBuilder('job_post')
      .orderBy('job_post.jopo_entity_id', 'DESC')
      .limit(1)
      .getOne();

    const date = new Date();
    const month = date.toLocaleString('default', { month: '2-digit' });
    const year = date.toLocaleString('default', { year: 'numeric' });

    const jopoNumber = `JOB#${year}${month}-${(jopoEntityId + 1)
      .toString()
      .padStart(4, '0')}`;

    return jopoNumber;
  }
}
