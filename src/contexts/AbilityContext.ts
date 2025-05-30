import { createContext } from 'react';
import { AppAbility, defineAbilitiesFor } from '@/abilities';
import { UserRole } from '@/roles';

export const abilityContext = createContext<AppAbility>(defineAbilitiesFor([UserRole.Guest]));
