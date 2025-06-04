import { useState, useEffect } from 'react';
import { showToast } from '@/helpers/notifier';
import { useUploadUserResumeMutation, useDeleteUserResumeMutation } from '@/services/users';
import { useUploadBlockSyllabusMutation, useDeleteBlockSyllabusMutation } from '@/services/blocks/blocksSvc';
import { BlockDetailDto } from '@/services/courses/types';

export type FileTarget = 'syllabus' | 'cv';

function useBlockFiles(block: BlockDetailDto) {
  const [uploadUserResume, { isLoading: isUploadingResume, error: resumeUploadError }] =
    useUploadUserResumeMutation();
  const [deleteUserResume, { isLoading: isDeletingResume, error: deleteResumeError }] =
    useDeleteUserResumeMutation();

  const [uploadBlockSyllabus, { isLoading: isUploadingSyllabus, error: uploadSyllabusError }] =
    useUploadBlockSyllabusMutation();
  const [deleteBlockSyllabus, { isLoading: isDeletingSyllabus, error: deleteSyllabusError }] =
    useDeleteBlockSyllabusMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [fileTarget, setFileTarget] = useState<FileTarget | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenUploadDialog = (target: FileTarget) => {
    setFileTarget(target);
    setOpenUploadDialog(true);
  };

  const handleCloseUploadDialog = () => {
    setSelectedFile(null);
    setFileTarget(null);
    setOpenUploadDialog(false);
  };

  const handleAddFile = async () => {
    if (!selectedFile || !fileTarget) return;
    try {
      if (fileTarget === 'cv') {
        await uploadUserResume({ file: selectedFile, blockId: block.blockId }).unwrap();
        showToast('CV subido correctamente', 'success');
      } else {
        await uploadBlockSyllabus({ file: selectedFile, blockId: block.blockId }).unwrap();
        showToast('Syllabus subido correctamente', 'success');
      }
    } catch {
      showToast(fileTarget === 'cv' ? 'Error subiendo CV' : 'Error subiendo Syllabus', 'error');
    } finally {
      handleCloseUploadDialog();
    }
  };

  const handleDeleteResume = async () => {
    try {
      await deleteUserResume({ blockId: block.blockId }).unwrap();
      showToast('CV eliminado correctamente', 'success');
    } catch {
      showToast('Error al eliminar CV', 'error');
    }
  };

  const handleDeleteSyllabus = async () => {
    try {
      await deleteBlockSyllabus({ blockId: block.blockId }).unwrap();
      showToast('Syllabus eliminado correctamente', 'success');
    } catch {
      showToast('Error al eliminar Syllabus', 'error');
    }
  };

  const existsSyllabus = block.syllabus && block.syllabus.downloadUrl.trim() !== '';
  const existsCV = block.cv && block.cv.downloadUrl.trim() !== '';

  useEffect(() => {
    if (uploadSyllabusError) {
      showToast('Error al subir Syllabus', 'error');
    }
  }, [uploadSyllabusError]);

  useEffect(() => {
    if (deleteSyllabusError) {
      showToast('Error al eliminar Syllabus', 'error');
    }
  }, [deleteSyllabusError]);

  useEffect(() => {
    if (deleteResumeError) {
      showToast('Error al eliminar CV', 'error');
    }
  }, [deleteResumeError]);

  return {
    openDialog,
    handleOpenDialog,
    handleCloseDialog,
    openUploadDialog,
    handleOpenUploadDialog,
    handleCloseUploadDialog,
    handleAddFile,
    handleDeleteResume,
    handleDeleteSyllabus,
    existsSyllabus,
    existsCV,
    selectedFile,
    setSelectedFile,
    fileTarget,
    isUploadingResume,
    isDeletingResume,
    isUploadingSyllabus,
    isDeletingSyllabus,
    resumeUploadError,
    uploadSyllabusError,
    deleteResumeError,
    deleteSyllabusError,
  };
}

export default useBlockFiles;
