import { abilityContext } from '@/contexts/AbilityContext';
import { createContextualCan } from '@casl/react';

export const Can = createContextualCan(abilityContext.Consumer);
