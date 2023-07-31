import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { authService } from '@/service/authService';

export function withAuth(gssp: GetServerSideProps): GetServerSideProps {
  return async (context) => {
    let user_data = null;
    const cookies = context.req.headers.cookie;
    if (cookies) {
      const parsedCookies = parse(cookies);
      const token = parsedCookies['access_token'];
      try {
        const userResponse = await authService.get('/auth/relogin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        user_data = userResponse.data;
      } catch (e) {
        return {
          redirect: { statusCode: 302, destination: '/' },
        };
      }
    } else {
      return {
        redirect: { statusCode: 302, destination: '/' },
      };
    }

    const gsspData = await gssp(context);

    if (!('props' in gsspData)) {
      throw new Error('invalid getSSP result');
    }

    return {
      props: {
        ...gsspData.props,
        user_data,
      },
    };
  };
}
