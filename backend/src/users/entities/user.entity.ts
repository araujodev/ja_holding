import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255 })
  password: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
