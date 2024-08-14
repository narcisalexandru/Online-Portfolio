/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto, UpdateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create(createArtistDto);
    return this.artistRepository.save(artist);
  }

  findAll() {
    return this.artistRepository.find();
  }

  findOne(id: number) {
    return this.artistRepository.findOne({ where: { id } });
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return this.artistRepository.update(id, updateArtistDto);
  }

  remove(id: number) {
    return this.artistRepository.delete(id);
  }
}
