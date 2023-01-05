import { useRouter } from 'next/router';
import { FC } from 'react';
import { useAppSelector } from '../../../../redux/redux_hooks';
import { selectUserData } from '../../../../redux/slices/userSlice';
import { NavigationsType } from '../../../../utils/navigation';
import MobileMainNav from './MobileMainNav'

type MobileMainNavContainerType = {
  openedBurger: boolean;
  navigationItems: NavigationsType;
  handleLogout: () => Promise<void>
}

const MobileMainNavContainer: FC<MobileMainNavContainerType> = ({
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

export default MobileMainNavContainer;