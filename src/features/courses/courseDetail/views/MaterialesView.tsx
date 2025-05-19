import React, { FC, useEffect, useState } from 'react';
import { formatDate } from '@/helpers/formatDate';
import { ArrowDropDown } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import { MaterialType, WeekWithMaterialsDto } from '@/services/materials/types';
import { useGetMaterialsByBlockIdQuery } from '@/services/materials/materialsSvc';

interface MaterialesViewProps {
  blockId: string;
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

const MaterialesView: FC<MaterialesViewProps> = ({ blockId }) => {
  const { data: weeks, isLoading, isFetching, error } = useGetMaterialsByBlockIdQuery({ blockId });
  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    if (weeks && weeks.length > 0) {
      setExpanded(weeks[0].id);
    }
  }, [weeks]);

  if (isLoading || isFetching) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <Typography color="error">Error al cargar materiales.</Typography>;
  }

  return (
    <>
      {weeks?.map((week: WeekWithMaterialsDto) => (
        <Accordion
          key={week.id}
          elevation={0}
          expanded={expanded === week.id}
          onChange={(_, isExpanded) => setExpanded(isExpanded ? week.id : false)}
        >
          <AccordionSummary
            sx={{
              borderRadius: '4px',
              '&.Mui-expanded': { minHeight: '48px', bgcolor: 'primary.lightest' },
              '& .MuiAccordionSummary-content.Mui-expanded': { m: '12px 0' },
            }}
            expandIcon={<ArrowDropDown />}
            aria-controls={`panel-${week.id}-content`}
            id={`panel-${week.id}-header`}
          >
            <Typography component="span">{week.week}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            {week.materials.map((mat, idx) => (
              <React.Fragment key={mat.materialId}>
                <Box
                  sx={{
                    p: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                  }}
                >
                  <Box>
                    <Typography sx={{ color: 'neutral.dark', lineHeight: 1, mb: '10px' }}>
                      {getTypeLabel(mat.materialType)} | {mat.materialName.split('.').pop()?.toUpperCase()}
                    </Typography>
                    <Typography sx={{ color: 'neutral.dark', lineHeight: 1, mb: '10px' }}>{mat.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Typography sx={{ color: 'neutral.dark', lineHeight: 1, fontSize: '14px' }}>
                        {formatDate(mat.uploadDate)}
                      </Typography>
                      <Typography sx={{ color: 'neutral.main', lineHeight: 1, fontSize: '14px' }}>
                        Subido por {mat.uploadedByName}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    color="secondary"
                    href={mat.materialUrl}
                    target="_blank"
                    // onClick={() => {
                    //   if (
                    //     mat.materialType === MaterialType.CLASS_RECORDING ||
                    //     mat.materialType === MaterialType.CLASS_SLIDES ||
                    //     mat.materialType === MaterialType.PRACTICE_FILE
                    //   ) {
                    //     downloadFileFromUrlString(mat.materialUrl);
                    //   } else {
                    //     window.open(mat.materialUrl, '_blank');
                    //   }
                    // }}
                  >
                    {mat.materialType === MaterialType.EXTERNAL_LINK ? 'Abrir' : 'Descargar'}
                  </Button>
                </Box>
                {idx < week.materials.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default MaterialesView;
