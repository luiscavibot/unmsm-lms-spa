import { Box, Skeleton } from '@mui/material';

export default function SkeletonView() {
  return (
    <>
      <Skeleton variant="text" width="30%" sx={{ mb: '48px' }} />
      <Skeleton variant="text" width="28%" sx={{ fontSize: '19px', mb: '4px' }} />
      <Skeleton variant="text" width="25%" sx={{ fontSize: '14px', mb: '40px' }} />
      <Skeleton variant="rounded" width="760px" height="112px" sx={{ mb: '40px' }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '40px' }}>
        <Box sx={{ width: '40%' }}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="60%" />
        </Box>
        <Skeleton variant="rounded" width="220px" height="56px" />
      </Box>
      <Skeleton variant="rounded" width="100%" height="350px" sx={{ mb: '40px' }} />
    </>
  );
}
