import { FC, useMemo, useState } from "react"
import Header from "./Header"
import { navWithAuth, navWithoutAuth } from '../../utils/navigation';
import { useAppDispatch } from "../../redux/redux_hooks";
import { remove_userData, selectUserData } from "../../redux/slices/userSlice";
import { useAppSelector } from '../../redux/redux_hooks';
import { supabase } from "../../utils/supabase";
import useIsXs from "../../hooks/useIsXs";

export type handleUpdateBurgerType = (openBurger: boolean) => void;

const HeaderContainer: FC = () => {
  const [openedBurger, setOpenedBurger] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const {
    session: userSession,
    isLoading
  } = useAppSelector(selectUserData)
  const isXs = useIsXs()

  const handleUpdateBurger: handleUpdateBurgerType = (openBurger) => {
    setOpenedBurger(openBurger)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    dispatch(remove_userData())
  }

  const navigationItems = useMemo(() => {
    if(isLoading) {
      return []

    } else if(userSession) {
      return navWithAuth

    } else {
      return navWithoutAuth
    }
  }, [userSession, isLoading])
  
  return (
    <Header
      openedBurger={openedBurger}
      handleUpdateBurger={handleUpdateBurger}
      navigationItems={navigationItems}
      handleLogout={handleLogout}
      isXs={isXs} />
  )
}

export default HeaderContainer