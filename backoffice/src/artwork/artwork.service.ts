/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { Artwork } from './entities/artworks.entity';
import { Artist } from '../artist/entities/artist.entity';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(Artwork)
    private artworkRepository: Repository<Artwork>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtworkDto: CreateArtworkDto) {
    let artist: Artist | undefined;
    if (createArtworkDto.artistId) {
      artist = await this.artistRepository.findOne({ where: { id: createArtworkDto.artistId } });
    }

    const artwork = this.artworkRepository.create({ 
      ...createArtworkDto, 
      artist 
    });

    return this.artworkRepository.save(artwork);
  }

  async update(id: number, updateArtworkDto: UpdateArtworkDto) {
    let artist: Artist | undefined;
    if (updateArtworkDto.artistId) {
      artist = await this.artistRepository.findOne({ where: { id: updateArtworkDto.artistId } });
    }
  
    const existingArtwork = await this.artworkRepository.findOne({ where: { id }, relations: ['artist'] });
    if (!existingArtwork) {
      throw new Error('Artwork not found');
    }
  
    const updatedArtwork = {
      ...existingArtwork,
      ...updateArtworkDto,
      artist 
    };
  
    return this.artworkRepository.save(updatedArtwork);
  }
  

  findAll(artistIds?: number[]) {
    if (artistIds && artistIds.length > 0) {
      return this.artworkRepository.find({
        where: { artist: { id: In(artistIds) } },
        relations: ['artist'],
      });
    }
    return this.artworkRepository.find({ relations: ['artist'] });
  }

  findOne(id: number) {
    return this.artworkRepository.findOne({ where: { id }, relations: ['artist'] });
  }

  remove(id: number) {
    return this.artworkRepository.delete(id);
  }
}
