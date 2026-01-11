import { Route } from '@/routes/_rootLayout.index';

export const Profile = () => {
  const result = Route.useLoaderData();

  return <div>{result.name}</div>;
};
