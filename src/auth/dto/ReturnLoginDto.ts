import { ReturnuserDto } from 'src/user/dtos/ReturnUser.dto';

export class ReturnLoginDto {
  accessToken: string;
  user: ReturnuserDto;
}
