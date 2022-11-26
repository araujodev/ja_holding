import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Project {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  zip_code: number;

  @Column()
  cost: number;

  @Column()
  deadline: string;

  @Column()
  done: boolean;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}
