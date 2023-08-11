import { PartialType } from '@nestjs/mapped-types';
import { CreateTalentApplyDto } from './create-talentapply.dto';

export class UpdateTalentApplyDto extends PartialType(CreateTalentApplyDto) {}
