/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsUrl()
  websiteLink: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}
