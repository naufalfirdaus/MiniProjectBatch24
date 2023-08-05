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
      relations: [
        'jobPhotos',
        'jobPostDesc',
        'jopoClit',
        'jopoJoro',
        'jopoJoca',
        'jopoJoty',
        'jopoEduCode',
        'jopoInduCode',
        'jopoStatus',
        'jopoWorkCode',
      ],
    });

    if (!jobPost) throw new NotFoundException();

    return jobPost;
  }

  async Create(photos: Array<Express.Multer.File>, new_post: CreateJobPostDto) {
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
        jopoEmpEntity: { empEntityId: new_post.emp_id },
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

      // return jobPost;
      return await this.jobPostRepository.save(jobPost);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async Update(jopoEntityId: number, updatedPost: UpdateJobPostDto) {
    try {
      return await this.jobPostRepository.update(jopoEntityId, {
        jopoTitle: updatedPost.title,
        jopoStartDate: updatedPost.start_date,
        jopoEndDate: updatedPost.end_date,
        // jopoMinSalary: updatedPost.min_sal,
        // jopoMaxSalary: updatedPost.max_sal,
        jopoMinExperience: updatedPost.min_exp,
        jopoMaxExperience: updatedPost.max_exp,
        jopoPrimarySkill: updatedPost.primary_skill,
        jopoSecondarySkill: updatedPost.secondary_skill,
        // jobPostDesc: {
        //   jopoDescription: updatedPost.des,
        //   jopoResponsibility: updatedPost.resp,
        //   jopoTarget: updatedPost.target,
        //   jopoBenefit: updatedPost.benefit,
        // },
        jopoModifiedDate: new Date(),
      });
    } catch (error) {
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
