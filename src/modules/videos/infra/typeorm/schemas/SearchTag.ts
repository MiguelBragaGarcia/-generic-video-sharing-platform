import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('video_tags')
class SearchTag {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  key: string;

  @Column('uuid')
  video_ids: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SearchTag;
