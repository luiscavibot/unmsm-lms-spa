import { Skeleton } from '@mui/material';
import React from 'react';

export default function SkeletonView() {
  return (
    <>
      <Skeleton variant="rounded" width="100%" height="310px" sx={{ mb: '32px' }} />
      <Skeleton variant="rounded" width="100%" height="48px" sx={{ mb: '24px' }} />
      <Skeleton variant="rounded" width="100%" height="600px" sx={{ mb: '24px' }} />
    </>
  );
}
