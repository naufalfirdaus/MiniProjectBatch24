import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { JobPost } from "./JobPost";
import { Status } from "./Status";
import { Users } from "./Users";
import { TalentApplyProgress } from "./TalentApplyProgress";

@Index("talentapply", ["taapEntityId", "taapUserEntityId"], { unique: true })
@Entity("talent_apply", { schema: "jobhire" })
export class TalentApply {
  @Column("integer", { primary: true, name: "taap_user_entity_id" })
  taapUserEntityId: number;

  @Column("integer", { primary: true, name: "taap_entity_id" })
  taapEntityId: number;

  @Column("character varying", { name: "taap_intro", nullable: true })
  taapIntro: string | null;

  @Column("integer", { name: "taap_scoring", nullable: true })
  taapScoring: number | null;

  @Column("timestamp without time zone", {
    name: "taap_modified_date",
    nullable: true,
  })
  taapModifiedDate: Date | null;

  @ManyToOne(() => JobPost, (jobPost) => jobPost.talentApplies)
  @JoinColumn([
    { name: "taap_entity_id", referencedColumnName: "jopoEntityId" },
  ])
  taapEntity: JobPost;

  @ManyToOne(() => Status, (status) => status.talentApplies)
  @JoinColumn([{ name: "taap_status", referencedColumnName: "status" }])
  taapStatus: Status;

  @ManyToOne(() => Users, (users) => users.talentApplies)
  @JoinColumn([
    { name: "taap_user_entity_id", referencedColumnName: "userEntityId" },
  ])
  taapUserEntity: Users;

  @OneToMany(
    () => TalentApplyProgress,
    (talentApplyProgress) => talentApplyProgress.talentApply
  )
  talentApplyProgresses: TalentApplyProgress[];
}
