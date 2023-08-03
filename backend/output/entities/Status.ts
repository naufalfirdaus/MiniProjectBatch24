import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Modules } from "./Modules";

@Index("status_pkey", ["status"], { unique: true })
@Entity("status", { schema: "master" })
export class Status {
  @Column("character varying", { primary: true, name: "status", length: 15 })
  status: string;

  @Column("timestamp without time zone", {
    name: "status_modified_date",
    nullable: true,
  })
  statusModifiedDate: Date | null;

  @ManyToOne(() => Modules, (modules) => modules.statuses)
  @JoinColumn([{ name: "status_module", referencedColumnName: "moduleName" }])
  statusModule: Modules;
}
