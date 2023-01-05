import { useRouter } from 'next/router';
import { FC } from 'react';
import { useAppSelector } from '../../../../redux/redux_hooks';
import { selectUserData } from '../../../../redux/slices/userSlice';
import { NavigationsType } from '../../../../utils/navigation';
import MobileMainNav from './DesktopMainNav'

type DesktopMainNavContainerType = {
  openedBurger: boolean;
  navigationItems: NavigationsType;
  handleLogout: () => Promise<void>
}

const DesktopMainNavContainer: FC<DesktopMainNavContainerType> = ({
  openedBurger,
  navigationItems,
  handleLogout
}) => {

  const router = useRouter()
  const { session: userSession } = useAppSelector(selectUserData)

  return (
    <MobileMainNav
      openedBurger={openedBurger}
      navigationItems={navigationItems}
      handleLogout={handleLogout}
      router={router}
      userSession={userSession} />
  );
};

export default DesktopMainNavContainer;