import React, { FC, useEffect, useState } from 'react';
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
import { WeekWithMaterialsDto } from '@/services/materials/types';
import {
  useGetMaterialsByBlockIdQuery,
  useDeleteMaterialFileMutation,
  useUploadMaterialMutation,
} from '@/services/materials/materialsSvc';
import { useAbility } from '@/hooks/useAbility';
import { BlockType } from '@/services/courses/types';
import { useAppSelector } from '@/store/hooks';
import { UserRole } from '@/roles';
import { showToast } from '@/helpers/notifier';
import MaterialItem from '../components/MaterialItem';
import AddMaterialDialog from '../components/AddMaterialDialog';

interface MaterialesViewProps {
  blockId: string;
  blockType: BlockType;
}

const MaterialesView: FC<MaterialesViewProps> = ({ blockId, blockType }) => {
  // 1️⃣ Carga de semanas con materiales
  const { data: weeks, isLoading, isFetching, error: fetchError } = useGetMaterialsByBlockIdQuery({ blockId });

  // 2️⃣ Hooks para mutaciones
  const [uploadMaterial, { isLoading: isUploading, error: uploadError }] = useUploadMaterialMutation();
  const [deleteMaterialFile, { isLoading: isDeleting }] = useDeleteMaterialFileMutation();

  // 3️⃣ Estado local
  const [expanded, setExpanded] = useState<string | false>(false);
  const [openWeekId, setOpenWeekId] = useState<string | null>(null);
  // **Nuevo estado para saber qué material está siendo eliminado**
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 4️⃣ Permisos CASL
  const ability = useAbility();
  const canViewTheoMatAddBtn = ability.can('view', 'theoMatAddBtn');
  const canViewPracMatAddBtn = ability.can('view', 'pracMatAddBtn');
  const canViewAddBtn = (): boolean => {
    if (blockType === BlockType.THEORY) return canViewTheoMatAddBtn;
    if (blockType === BlockType.PRACTICE) return canViewPracMatAddBtn;
    return false;
  };

  const handleOpenAddFileDialog = (weekId: string) => {
    setOpenWeekId(weekId);
  };
  const handleCloseAddFileDialog = () => {
    setOpenWeekId(null);
  };

  // 7️⃣ Expandir primera semana si no hay rol Teacher
  const { user } = useAppSelector((state) => state.auth);
  const roles = user?.['cognito:groups'] || [];
  useEffect(() => {
    if (roles.length === 0) return;
    if (weeks && weeks.length > 0 && !roles.includes(UserRole.Teacher)) {
      setExpanded(weeks[0].id);
    }
  }, [weeks, user]);

  const handleAddFile = async (formData: FormData) => {
    await uploadMaterial(formData).unwrap();
  };

  // 🔟 Eliminar material (usando deletingId para controlar el botón correcto)
  const handleDeleteMaterial = async (materialId: string, weekId: string) => {
    setDeletingId(materialId); // marco este material como “en proceso”
    try {
      await deleteMaterialFile({ id: materialId, weekId, blockId }).unwrap();
      showToast('Material eliminado correctamente', 'success');
    } catch (err) {
      console.error('Error eliminando material:', err);
      showToast('Error al eliminar el material', 'error');
    } finally {
      setDeletingId(null); // sin importar resultado, limpio el estado
    }
  };

  // 1️⃣1️⃣ Loader / Error al cargar semanas
  if (isLoading || isFetching) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (fetchError) {
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
              <MaterialItem
                key={mat.materialId}
                material={mat}
                weekId={week.id}
                roles={roles}
                deletingId={deletingId}
                isDeleting={isDeleting}
                showDivider={idx < week.materials.length - 1}
                onDelete={handleDeleteMaterial}
              />
            ))}

            {/* Botón “Agregar material” para esta semana */}
            {canViewAddBtn() && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: '28px' }}>
                  <Button
                    color="secondary"
                    variant="outlined"
                    size="large"
                    onClick={() => handleOpenAddFileDialog(week.id)}
                  >
                    Agregar material
                  </Button>
                </Box>

                <AddMaterialDialog
                  open={openWeekId === week.id}
                  weekId={week.id}
                  blockId={blockId}
                  onClose={handleCloseAddFileDialog}
                  onUpload={handleAddFile}
                  isUploading={isUploading}
                  uploadError={uploadError}
                />
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default MaterialesView;
