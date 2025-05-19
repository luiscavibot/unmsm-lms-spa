export enum MaterialType {
  EXTERNAL_LINK = 'external_link',
  CLASS_RECORDING = 'class_recording',
  CLASS_SLIDES = 'class_slides',
  PRACTICE_FILE = 'practice_file',
}

export interface MaterialResponseDto {
  materialId: string;
  name: string;
  materialType: MaterialType;
  uploadDate: string;
  uploadedById: string;
  uploadedByName: string;
  materialUrl: string;
  materialName: string;
}

export interface WeekWithMaterialsDto {
  id: string;
  week: string;
  weekNumber: number;
  materials: MaterialResponseDto[];
}

export interface GetMaterialsByBlockDto {
  weeks: WeekWithMaterialsDto[];
}
