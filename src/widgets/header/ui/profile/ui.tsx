import Link from 'next/link';
import clsx from 'clsx';
import { useStore } from 'effector-react';
import { authModel } from 'widgets/auth';
import { sessionModel } from 'entities/session';
import { useToggler } from 'shared/lib/toggler';
import { ProfileIcon } from 'shared/ui/icons';
import { paths } from 'shared/routing';
import styles from './styles.module.scss';

export const Profile = () => {
  const { open } = useToggler(authModel.toggler);
  const isLogged = useStore(sessionModel.$isLogged);

  const ProfileLink = (
    <Link href={paths.profile} className={styles.profile}>
      <ProfileIcon />
      Профиль
    </Link>
  );

  const ProfileButton = (
    <button onClick={open} className={clsx('btn-reset', styles.profile)}>
      <ProfileIcon />
      Войти
    </button>
  );

  return isLogged ? ProfileLink : ProfileButton;
};
