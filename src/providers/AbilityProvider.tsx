import { defineAbilitiesFor } from '@/abilities';
import { UserRole } from '@/roles';
import { useAppSelector } from '@/store/hooks';
import { FC, useMemo } from 'react';
import { abilityContext } from '@/contexts/AbilityContext';

interface AbilityProviderProps {
  children: React.ReactNode;
}

const AbilityProvider: FC<AbilityProviderProps> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);

  const roles = useMemo<UserRole[]>(() => {
    const groups = user?.['cognito:groups'] as UserRole[] | undefined;
    return groups?.length ? groups : [UserRole.Guest];
  }, [user?.['cognito:groups']]);

  const ability = useMemo(() => defineAbilitiesFor(roles), [roles]);

  return <abilityContext.Provider value={ability}>{children}</abilityContext.Provider>;
};

export default AbilityProvider;
