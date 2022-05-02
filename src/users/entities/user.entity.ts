import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
@Unique(['login_id'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'login_id',
    comment: '유저 아이디',
  })
  loginId: string;

  @Column({ type: 'varchar', length: 255, comment: '유저 패스워드' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 50, comment: '유저 이름' })
  name: string;

  @Column({ type: 'varchar', length: 255, comment: '유저 이메일' })
  email: string;

  @CreateDateColumn({
    name: 'create_at',
    comment: '생성일',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    comment: '수정일',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;
}
