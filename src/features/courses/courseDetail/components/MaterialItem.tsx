import React, { FC } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { MaterialResponseDto, MaterialLabel, MaterialType } from '@/services/materials/types';
import { formatDate } from '@/helpers/formatDate';
import { UserRole } from '@/roles';

interface MaterialItemProps {
  material: MaterialResponseDto;
  weekId: string;
  roles: string[];
  deletingId: string | null;
  isDeleting: boolean;
  showDivider?: boolean;
  onDelete: (materialId: string, weekId: string) => void;
}

const getTypeLabel = (type: MaterialType): string => {
  switch (type) {
    case MaterialType.CLASS_RECORDING:
      return 'Grabación de clase';
    case MaterialType.CLASS_SLIDES:
      return 'Diapositivas';
    case MaterialType.PRACTICE_FILE:
      return 'Archivo de práctica';
    case MaterialType.EXTERNAL_LINK:
      return 'Enlace';
    default:
      return type;
  }
};

const getMaterialLabelText = (label: MaterialLabel): string => {
  switch (label) {
    case MaterialLabel.Recent:
      return 'Recién agregado';
    default:
      return label;
  }
};

const MaterialItem: FC<MaterialItemProps> = ({
  material,
  weekId,
  roles,
  deletingId,
  isDeleting,
  showDivider,
  onDelete,
}) => (
  <>
    <Box
      sx={{
        p: { xs: '12px', sm: '16px' },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: '16px', sm: 0 },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', sm: 'start' },
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '8px' }}>
          <Typography sx={{ color: 'neutral.dark' }}>
            {getTypeLabel(material.materialType)} {material.fileExtension ? `| ${material.fileExtension}` : ''}
          </Typography>
          {material.labels.map((label, index) => (
            <Box
              key={material.materialId + index}
              sx={{
                borderRadius: '4px',
                px: 1,
                borderColor: 'secondary.light',
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
            >
              <Typography sx={{ color: 'neutral.main', fontSize: '12px' }}>{getMaterialLabelText(label)}</Typography>
            </Box>
          ))}
        </Box>
        <Typography sx={{ color: 'neutral.dark', lineHeight: 1, mb: '10px' }}>{material.name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Typography sx={{ color: 'neutral.main', lineHeight: 1, fontSize: '14px' }}>
            {formatDate(material.uploadDate)}
          </Typography>
          <Typography sx={{ color: 'neutral.main', lineHeight: 1, fontSize: '14px' }}>
            Subido por {material.uploadedByName}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          justifyContent: { xs: 'flex-start', sm: 'flex-end' },
        }}
      >
        <Button variant="outlined" color="secondary" href={material.materialUrl} target="_blank">
          Descargar
        </Button>

        {roles.includes(UserRole.Teacher) && (
          <Button
            size="medium"
            variant="outlined"
            color="error"
            onClick={() => onDelete(material.materialId, weekId)}
            disabled={isDeleting && deletingId === material.materialId}
          >
            {isDeleting && deletingId === material.materialId ? 'Eliminando…' : 'Eliminar'}
          </Button>
        )}
      </Box>
    </Box>
    {showDivider && <Divider />}
  </>
);

export default MaterialItem;
