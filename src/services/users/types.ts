export enum UserStatusType {
  ARCHIVED = 'ARCHIVED',
  COMPROMISED = 'COMPROMISED',
  CONFIRMED = 'CONFIRMED',
  EXTERNAL_PROVIDER = 'EXTERNAL_PROVIDER',
  FORCE_CHANGE_PASSWORD = 'FORCE_CHANGE_PASSWORD',
  RESET_REQUIRED = 'RESET_REQUIRED',
  UNCONFIRMED = 'UNCONFIRMED',
  UNKNOWN = 'UNKNOWN',
}
export interface UserDto {
  id: string;
  name: string;
  email: string;
  imgUrl: string;
  resumeUrl: string;
  resumeUpdateDate: string;
  enabled: boolean;
  status: UserStatusType;
}
export interface ResumeResponseDto {
  id: string;
  name: string;
  email: string;
  imgUrl: string;
  resumeUrl: string;
  resumeUpdateDate: string;
  enabled: boolean;
  status: UserStatusType;
}
