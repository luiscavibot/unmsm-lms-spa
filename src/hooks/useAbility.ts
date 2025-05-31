import { AppAbility } from '@/abilities';
import { abilityContext } from '@/contexts/AbilityContext';
import { useContext } from 'react';

export function useAbility(): AppAbility {
  const context = useContext(abilityContext);
  if (!context) {
    throw new Error('useAbility debe usarse dentro de un AbilityProvider');
  }
  return context;
}
