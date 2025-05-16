import React from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Typography } from '@mui/material';

export default function MaterialesView() {
  const handlerClicButton = () => {
    console.log('Botón clickeado');
  };
  return (
    <>
      <Accordion elevation={0}>
        <AccordionSummary
          sx={{
            borderRadius: '4px',
            '&.Mui-expanded': {
              minHeight: '48px',
              bgcolor: 'primary.lightest',
            },
            '& .MuiAccordionSummary-content.Mui-expanded': {
              m: '12px 0',
            },
          }}
          expandIcon={<ArrowDropDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Semana 2</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Box sx={{ p: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <Box>
              <Typography sx={{ color: 'neutral.dark', lineHeight: '1', mb: '10px' }}>Grabación de clase | Mp4</Typography>
              <Typography sx={{ color: 'neutral.dark', lineHeight: '1', mb: '10px' }}>
                Clase 5: Redes de computadoras: Un enfoque descendente
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Typography sx={{ color: 'neutral.dark', lineHeight: '1', fontSize: '14px' }}>29 mar. de 2025</Typography>
                <Typography sx={{ color: 'neutral.main', lineHeight: '1', fontSize: '14px' }}>Subido por Eduardo Romero</Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                handlerClicButton();
              }}
            >
              Abrir
            </Button>
          </Box>
          <Divider />
          <Box sx={{ p: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <Box>
              <Typography sx={{ color: 'neutral.dark', lineHeight: '1', mb: '10px' }}>Grabación de clase | Mp4</Typography>
              <Typography sx={{ color: 'neutral.dark', lineHeight: '1', mb: '10px' }}>
                Clase 5: Redes de computadoras: Un enfoque descendente
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Typography sx={{ color: 'neutral.dark', lineHeight: '1', fontSize: '14px' }}>29 mar. de 2025</Typography>
                <Typography sx={{ color: 'neutral.main', lineHeight: '1', fontSize: '14px' }}>Subido por Eduardo Romero</Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                handlerClicButton();
              }}
            >
              Descargar
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={0}>
        <AccordionSummary
          sx={{
            borderRadius: '4px',
            '&.Mui-expanded': {
              minHeight: '48px',
              bgcolor: 'primary.lightest',
            },
            '& .MuiAccordionSummary-content.Mui-expanded': {
              m: '12px 0',
            },
          }}
          expandIcon={<ArrowDropDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Semana 1</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Box sx={{ p: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <Box>
              <Typography sx={{ color: 'neutral.dark', lineHeight: '1', mb: '10px' }}>Grabación de clase | Mp4</Typography>
              <Typography sx={{ color: 'neutral.dark', lineHeight: '1', mb: '10px' }}>
                Clase 5: Redes de computadoras: Un enfoque descendente
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Typography sx={{ color: 'neutral.dark', lineHeight: '1', fontSize: '14px' }}>29 mar. de 2025</Typography>
                <Typography sx={{ color: 'neutral.main', lineHeight: '1', fontSize: '14px' }}>Subido por Eduardo Romero</Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                handlerClicButton();
              }}
            >
              Abrir
            </Button>
          </Box>
          <Divider />
          <Box sx={{ p: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <Box>
              <Typography sx={{ color: 'neutral.dark', lineHeight: '1', mb: '10px' }}>Grabación de clase | Mp4</Typography>
              <Typography sx={{ color: 'neutral.dark', lineHeight: '1', mb: '10px' }}>
                Clase 5: Redes de computadoras: Un enfoque descendente
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Typography sx={{ color: 'neutral.dark', lineHeight: '1', fontSize: '14px' }}>29 mar. de 2025</Typography>
                <Typography sx={{ color: 'neutral.main', lineHeight: '1', fontSize: '14px' }}>Subido por Eduardo Romero</Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                handlerClicButton();
              }}
            >
              Descargar
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
