import React from 'react';
import s from './Header.module.css';
export const Header = () => {
  // const dispatch = useAppDispatch();
  // const router = useRouter();
  // const getUser = useCallback(async () => {
  //   try {
  //     const response: AxiosResponse<User> = await globalService.get(
  //       'auth/relogin',
  //     );
  //     const { data } = response;
  //     dispatch(setUser(data));
  //   } catch (err) {
  //     await router.push('/login');
  //   }
  // }, [dispatch]);
  return <div className={s.generalHeader}>Header</div>;
};
