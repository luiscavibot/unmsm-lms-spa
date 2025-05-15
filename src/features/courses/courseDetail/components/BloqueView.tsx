import { Box, Typography } from '@mui/material';

interface BloqueViewProps {
  value: string;
  nombre: string;
}

export default function BloqueView({ value, nombre }: BloqueViewProps) {
  return (
    <Box sx={{ px: '24px', py: '32px', bgcolor: 'neutral.lightest', borderRadius: '8px' }}>
      <Typography variant="h6" sx={{ mb: '24px', fontSize: '20px', fontWeight: '700', color: 'neutral.dark' }}>
        {nombre}
      </Typography>

      {/* Aquí irían los tabs dinámicos según el bloque */}
      <Typography variant="body2">
        Aquí iría el contenido específico para el bloque "{nombre}". Puedes agregar tabs o secciones según corresponda.
      </Typography>
    </Box>
  );
}
