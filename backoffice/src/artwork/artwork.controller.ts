/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';

@Controller('/api/artworks')
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) {}

  @Post()
  create(@Body() createArtworkDto: CreateArtworkDto) {
    return this.artworkService.create(createArtworkDto);
  }

  @Get()
  findAll(@Query('artistIds') artistIds?: string) {
    const artistIdArray = artistIds ? artistIds.split(',').map(Number) : [];
    return this.artworkService.findAll(artistIdArray);
  }
  
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const artwork = await this.artworkService.findOne(id);
    if (!artwork) {
      throw new BadRequestException('Artwork not found');
    }
    return artwork;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArtworkDto: UpdateArtworkDto) {
    return this.artworkService.update(id, updateArtworkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.artworkService.remove(id);
  }
}
