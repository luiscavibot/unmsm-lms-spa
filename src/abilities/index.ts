import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';
import type { Actions, Subjects } from './actions-subjects';
import { Role, UserRole, BlockRole } from '@/roles';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilitiesFor(roles: Role[]): AppAbility {
  const { can, cannot, rules } = new AbilityBuilder<AppAbility>(createMongoAbility);

  // 1. Caso: si es Teacher + Responsible → puede "view" en ambos botones
  if (roles.includes(UserRole.Teacher) && roles.includes(BlockRole.Responsible)) {
    can('view', 'theoGenResEditBtns');
    can('view', 'pracGenResEditBtns');
  }
  // 2. Caso: si es Teacher + Collaborator → puede "view" solo en practicas
  else if (roles.includes(UserRole.Teacher) && roles.includes(BlockRole.Collaborator)) {
    can('view', 'pracGenResEditBtns');
  }
  // 3. Si es Teacher (pero sin BlockRole específico), denegro explícito el "view" en todos los botones
  else if (roles.includes(UserRole.Teacher)) {
    cannot('view', 'theoGenResEditBtns');
    cannot('view', 'pracGenResEditBtns');
  }

  // 4. Rol Admin: tiene "manage" sobre todo
  if (roles.includes(UserRole.Admin)) {
    can('manage', 'all');
  }

  // 5. Rol Student: puede "view" en courseCardTeacherName (y no afectamos otros permisos)
  if (roles.includes(UserRole.Student)) {
    can('view', 'courseCardTeacherName');
  }

  // 6. Rol Guest (u otro rol que no sea Admin/Student/Teacher): denegar "view" en courseCardTeacherName
  else if (roles.includes(UserRole.Guest)) {
    cannot('view', 'courseCardTeacherName');
  }

  return createMongoAbility<[Actions, Subjects]>(rules);
}
