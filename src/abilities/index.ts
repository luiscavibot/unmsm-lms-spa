import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';
import type { Actions, Subjects } from './actions-subjects';
import { Role, UserRole, BlockRole } from '@/roles';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilitiesFor(roles: Role[]): AppAbility {
  const { can, cannot, rules } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (roles.includes(UserRole.Teacher) && roles.includes(BlockRole.Responsible)) {
    can('view', 'theoGenResEditBtns');
    can('view', 'pracGenResEditBtns');
    can('view', 'theoMatAddBtn');
    can('view', 'pracMatAddBtn');
    can('view', 'theoClassAttCtrl');
    can('view', 'pracClassAttCtrl');
    //    'theoCourseNotesCtrl',
    // 'pracCourseNotesCtrl',
    can('view', 'theoCourseNotesCtrl');
    can('view', 'pracCourseNotesCtrl');
  } else if (roles.includes(UserRole.Teacher) && roles.includes(BlockRole.Collaborator)) {
    can('view', 'pracGenResEditBtns');
    can('view', 'pracMatAddBtn');
    can('view', 'pracClassAttCtrl');
    can('view', 'pracCourseNotesCtrl');
  } else if (roles.includes(UserRole.Teacher)) {
    cannot('view', 'theoGenResEditBtns');
    cannot('view', 'pracGenResEditBtns');
    cannot('view', 'theoMatAddBtn');
    cannot('view', 'pracMatAddBtn');
    cannot('view', 'theoClassAttCtrl');
    cannot('view', 'pracClassAttCtrl');
    cannot('view', 'theoCourseNotesCtrl');
    cannot('view', 'pracCourseNotesCtrl');
  }

  if (roles.includes(UserRole.Admin)) {
    can('manage', 'all');
  }

  if (roles.includes(UserRole.Student)) {
    can('view', 'courseCardTeacherName');
  } else if (roles.includes(UserRole.Guest)) {
    cannot('view', 'courseCardTeacherName');
  }

  return createMongoAbility<[Actions, Subjects]>(rules);
}
