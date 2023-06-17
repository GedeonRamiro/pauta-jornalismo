import {
  ExecutionContext,
  createParamDecorator,
  ForbiddenException,
} from '@nestjs/common';
import { authorizantionToLoginPayload } from 'src/utils/base-64-converter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  if (!authorization) {
    throw new ForbiddenException('Não tem permisão ou token inválido!');
  }

  const loginPayload = authorizantionToLoginPayload(authorization);

  return loginPayload.id;
});
