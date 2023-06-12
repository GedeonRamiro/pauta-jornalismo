import { SetMetadata } from '@nestjs/common';
import { UserType } from '../user/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
