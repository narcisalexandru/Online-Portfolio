/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
  
  @Column()
  websiteLink: string;
  
  @Column()
  imageUrl: string;

  @ManyToOne(() => Artist, artist => artist.artworks)
  artist: Artist;
}
