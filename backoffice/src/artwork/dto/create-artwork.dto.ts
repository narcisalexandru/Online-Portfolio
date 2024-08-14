/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, IsUrl, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateArtworkDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsUrl()
  @IsOptional()
  websiteLink?: string;

  @IsString()
  imageUrl: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  artistId?: number;
}
