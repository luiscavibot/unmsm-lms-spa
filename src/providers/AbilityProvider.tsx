import { defineAbilitiesFor } from '@/abilities';
import { UserRole } from '@/roles';
import { useAppSelector } from '@/store/hooks';
import { FC, useMemo } from 'react';
import { abilityContext } from '@/contexts/AbilityContext';
import { useGetBlockAssignmentRoleQuery } from '@/services/blockAssignments/blockAssignmentsSvc';

interface AbilityProviderProps {
  children: React.ReactNode;
}

const AbilityProvider: FC<AbilityProviderProps> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);
  const courseOfferingId = useAppSelector((state) => state.courseOfferings.courseOfferingSelected?.courseId);

  const roles = useMemo<UserRole[]>(() => {
    const groups = user?.['cognito:groups'] as UserRole[] | undefined;
    return groups?.length ? groups : [UserRole.Guest];
  }, [user?.['cognito:groups']]);

  const { data: blockAssignment } = useGetBlockAssignmentRoleQuery(
    { courseOfferingId: courseOfferingId! },
    { skip: !courseOfferingId },
  );

  const combinedRoles = useMemo<UserRole[]>(() => {
    if (blockAssignment?.isAssigned && blockAssignment.blockRol) {
      return [...roles, blockAssignment.blockRol];
    }
    return roles;
  }, [roles, blockAssignment]);

  console.log('Combined Roles:', combinedRoles);

  const ability = useMemo(() => defineAbilitiesFor(combinedRoles), [combinedRoles]);

  return <abilityContext.Provider value={ability}>{children}</abilityContext.Provider>;
};

export default AbilityProvider;
