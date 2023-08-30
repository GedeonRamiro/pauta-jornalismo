import { LoginPayloadDto } from '../auth/dto/LoginPayloadDto';

export const authorizantionToLoginPayload = (
  authorizantion: string,
): LoginPayloadDto | undefined => {
  const authorizantionSplited = authorizantion.split('.');

  if (authorizantionSplited.length < 3 || !authorizantionSplited[1]) {
    return undefined;
  }

  return JSON.parse(Buffer.from(authorizantionSplited[1], 'base64').toString());
};
