// import { useAppSelector } from '@/store/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Action, createCan, Subject } from '@/helpers/createCan';
import { role } from '@/configs/consts';

interface RequireAbilityProps {
  action: Action;
  subject: Subject;
}

const RequireAbility: React.FC<RequireAbilityProps> = ({ action, subject }) => {
  //   const role = useAppSelector((s) => s.auth.user?.role);
  const can = createCan(role);
  const location = useLocation();

  return can(action, subject) ? <Outlet /> : <Navigate to="/" replace state={{ from: location }} />;
};

export default RequireAbility;
