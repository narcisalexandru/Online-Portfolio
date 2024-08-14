/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artwork } from './entities/artworks.entity';
import { ArtworkService } from './artwork.service';
import { ArtworkController } from './artwork.controller';
import { Artist } from '../artist/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artwork, Artist])],
  providers: [ArtworkService],
  controllers: [ArtworkController],
})
export class ArtworkModule {}
