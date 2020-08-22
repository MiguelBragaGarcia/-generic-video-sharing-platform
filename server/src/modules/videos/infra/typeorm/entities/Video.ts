import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('videos')
class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  video: string;

  @Column()
  views: number;

  @Column()
  thumbnail: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'video_thumbnail' })
  getThumbnailUrl(): string | null {
    if (this.thumbnail !== '') {
      return `${process.env.APP_API_URL}/files/${this.thumbnail}`;
    }

    return null;
  }

  @Expose({ name: 'video_url' })
  getVideoUrl(): string | null {
    if (this.video !== '') {
      return `${process.env.APP_API_URL}/files/${this.video}`;
    }

    return null;
  }
}

export default Video;
