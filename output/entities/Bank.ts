import { Column, Entity, Index } from 'typeorm';

@Index('bank_bank_code_key', ['bankCode'], { unique: true })
@Index('bank_pkey', ['bankEntityId'], { unique: true })
@Index('bank_bank_name_key', ['bankName'], { unique: true })
@Entity('bank', { schema: 'payment' })
export class Bank {
  @Column('integer', { primary: true, name: 'bank_entity_id' })
  bankEntityId: number;

  @Column('character varying', {
    name: 'bank_code',
    nullable: true,
    unique: true,
    length: 10,
  })
  bankCode: string | null;

  @Column('character varying', {
    name: 'bank_name',
    nullable: true,
    unique: true,
    length: 55,
  })
  bankName: string | null;

  @Column('timestamp without time zone', {
    name: 'bank_modified_date',
    nullable: true,
  })
  bankModifiedDate: Date | null;
}
