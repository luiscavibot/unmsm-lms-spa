import { Avatar, Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Course } from '@/services/courses/types';
import { formatDate } from '@/helpers/formatDate';
import { getInitials } from '@/helpers/avatar';
import { Link } from 'react-router-dom';

type CardCourseProps = Course;

export default function CardCourse({ courseId, name, teacher, startDate, endDate, semester, module, unstarted }: CardCourseProps) {
  const theme = useTheme();
  const teacherNameInitials = getInitials(teacher.name);
  const startDateFormatted = formatDate(startDate);
  const endDateFormatted = formatDate(endDate);
  const avatarColor = unstarted ? theme.palette.grey[400] : theme.palette.primary.main;
  const Wrapper = unstarted ? Box : Link;
  return (
    <Box
      component={Wrapper}
      to={!unstarted ? `/courses/posgrado/${courseId}` : undefined}
      sx={{ width: '100%', maxWidth: '344px', textDecoration: 'none' }}
      id={courseId}
    >
      <Card
        variant="outlined"
        sx={{
          bgcolor: unstarted ? theme.palette.neutral.light : 'background.paper',
        }}
      >
        <CardContent>
          {unstarted && (
            <Chip
              label="Sin iniciar"
              size="small"
              sx={{
                fontSize: '12px',
                fontWeight: 400,
                color: theme.palette.secondary.dark,
                borderColor: theme.palette.secondary.dark,
                mb: 1,
              }}
              variant="outlined"
            />
          )}
          <Typography gutterBottom sx={{ color: theme.palette.secondary.dark, fontSize: '16px', fontWeight: '700', mb: '12px', lineHeight: '1.2' }}>
            {name}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: avatarColor,
              }}
            >
              {teacherNameInitials}
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }} variant="body2">
                Docente responsable
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="body2">
                {teacher.name}
              </Typography>
            </Box>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack direction="column" sx={{ gap: unstarted ? '12px 0px' : '44px 0px' }}>
            <Stack direction="column" spacing={'4px'}>
              <Typography variant="body2">Inicio: {startDateFormatted}</Typography>
              <Typography variant="body2">Fin: {endDateFormatted}</Typography>
            </Stack>
            <Typography sx={{ textAlign: 'right' }} variant="body2">
              {semester} | {module}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
