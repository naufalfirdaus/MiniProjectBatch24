import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { ProgramEntityDescription } from 'output/entities/ProgramEntityDescription';
import { Sections } from 'output/entities/Sections';
import { SectionDetail } from 'output/entities/SectionDetail';
import { SectionDetailMaterial } from 'output/entities/SectionDetailMaterial';
import { ProgramEntityInterface } from './program_entity.interface';

@Injectable()
export class ProgramEntityService {
  constructor(
    @InjectRepository(ProgramEntity)
    private serviceProgEntity: Repository<ProgramEntity>,
    @InjectRepository(ProgramEntityDescription)
    private serviceProgEntDesc: Repository<ProgramEntityDescription>,
    @InjectRepository(Sections)
    private serviceSec: Repository<Sections>,
    @InjectRepository(SectionDetail)
    private serviceSecDet: Repository<SectionDetail>,
    @InjectRepository(SectionDetailMaterial)
    private serviceSecDetMat: Repository<SectionDetailMaterial>,
  ) {}

  /* 
    Get all data Program Entity
  */
  public async findAll(
    options: PaginationOptions,
  ): Promise<ProgramEntityInterface> {
    const skippedItems = (options.page - 1) * options.limit;
    const totalCount = await this.serviceProgEntity.count();
    const program_entity = await this.serviceProgEntity.find({
      take: options.limit,
      skip: skippedItems,
    });
    return {
      totalCount,
      page: options.page,
      limit: options.limit,
      data: program_entity,
    };
  }

  public async search(
    options: PaginationOptions,
  ): Promise<ProgramEntityInterface> {
    const skippedItems = (options.page - 1) * options.limit;
    const totalCount = await this.serviceProgEntity.count();
    if (options.name && options.status) {
      const program_entity = await this.serviceProgEntity.find({
        take: options.limit,
        skip: skippedItems,
        where: [
          {
            progTitle: Like(`%${options.name}%`),
            progLearningType: Like(`%${options.status}%`),
          },
        ],
      });
      return {
        totalCount,
        page: options.page,
        limit: options.limit,
        data: program_entity,
      };
    } else {
      const program_entity = await this.serviceProgEntity.find({
        take: options.limit,
        skip: skippedItems,
      });
      return {
        totalCount,
        page: options.page,
        limit: options.limit,
        data: program_entity,
      };
    }
  }

  /* 
    Create data Program Entity
    Include table:
      program_entity,
      program_entity_description,
  */
  public async create(file: any, fields: any) {
    try {
      // Insert ke Table program_entity
      const progEnt = await this.serviceProgEntity.save({
        progHeadline: fields.progHeadline,
        progTitle: fields.progTitle,
        progType: fields.progType,
        progLearningType: fields.progLearningType,
        progRating: fields.progRating,
        progTotalTrainee: fields.progTotalTrainee,
        progImage: file.originalname,
        progBestSeller: fields.progBestSeller,
        progPrice: fields.progPrice,
        progLanguage: fields.progLanguage,
        progDuration: fields.progDuration,
        progDurationType: fields.progDurationType,
        progTagSkill: fields.progTagSkill,
        progCityId: fields.progCityId,
        progCateId: fields.progCateId,
        progCreatedBy: fields.progCreatedBy, // belum di ada function cek employee instructor apa bukan
        progStatus: fields.progStatus,
      });

      // Insert ke Table program_entity_description
      await this.serviceProgEntDesc.save({
        predProgEntityId: progEnt.progEntityId,
        predItemLearning: { items: fields.predItemLearning },
        predDescription: { items: fields.predDescription },
      });

      const result = await this.serviceProgEntity.findOne({
        where: { progEntityId: progEnt.progEntityId },
        relations: ['programEntityDescription'],
      });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  public async findOne(id: number) {
    const progEntity = await this.serviceProgEntity.findOne({
      where: { progEntityId: id },
      relations: [
        'programEntityDescription',
        'sections',
        'sections.sectionDetails',
        'sections.sectionDetails.sectionDetailMaterials',
      ],
    });
    return progEntity;
  }

  public async update(file: any, id: number, fields: any) {
    try {
      await this.serviceProgEntity.update(id, {
        progHeadline: fields.progHeadline,
        progTitle: fields.progTitle,
        progType: fields.progType,
        progLearningType: fields.progLearningType,
        progRating: fields.progRating,
        progTotalTrainee: fields.progTotalTrainee,
        progImage: file.originalname,
        progBestSeller: fields.progBestSeller,
        progPrice: fields.progPrice,
        progLanguage: fields.progLanguage,
        progDuration: fields.progDuration,
        progDurationType: fields.progDurationType,
        progTagSkill: fields.progTagSkill,
        progCityId: fields.progCityId,
        progCateId: fields.progCateId,
        progCreatedBy: fields.progCreatedBy, // belum di ada function cek employee instructor apa bukan
        progStatus: fields.progStatus,
      });

      await this.serviceProgEntDesc.update(id, {
        predItemLearning: { items: fields.predItemLearning },
        predDescription: { items: fields.predDescription },
      });

      const result = await this.serviceProgEntity.findOne({
        where: { progEntityId: id },
        relations: ['programEntityDescription'],
      });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  public async Delete(id: number) {
    try {
      const section = await this.serviceSec.find({
        where: { sectProgEntityId: id },
        relations: ['sectionDetails', 'sectionDetails.sectionDetailMaterials'],
      });

      for (const item of section) {
        for (const itemDetail of item.sectionDetails) {
          await this.serviceSecDet.remove(itemDetail);
        }
        await this.serviceSec.remove(item);
      }
      await this.serviceProgEntDesc.delete(id);
      await this.serviceProgEntity.delete(id);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
