import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';
import type { Actions, Subjects } from './actions-subjects';
import { Role, UserRole } from '@/roles';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilitiesFor(roles: Role[]): AppAbility {
  const { can, cannot, rules } = new AbilityBuilder<AppAbility>(createMongoAbility);

  roles.forEach((role) => {
    switch (role) {
      case UserRole.Admin:
        can('manage', 'all');
        break;

      case UserRole.Student:
        can('view', 'courseCardTeacherName');
        break;

      case UserRole.Teacher:
        cannot('view', 'courseCardTeacherName');
        break;

      default:
        cannot('view', 'courseCardTeacherName');
        break;
    }
  });

  return createMongoAbility<[Actions, Subjects]>(rules);
}
