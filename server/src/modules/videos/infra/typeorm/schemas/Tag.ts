import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('video_tags')
class Tag {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  video_id: string;

  @Column()
  tags: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tag;
