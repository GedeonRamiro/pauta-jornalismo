import { ReturnUserDto } from '../../user/dtos/ReturnUser.dto';

export class ReturnLoginDto {
  accessToken: string;
  user: ReturnUserDto;
}
