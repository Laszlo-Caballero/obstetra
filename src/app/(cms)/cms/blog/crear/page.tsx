import { ResponseBlogCategoria } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import { getToken } from '@/utils/getToken';
import MainSection from './MainSection';

export default async function CreateBlog() {
  const token = await getToken();
  const resCategories = await fetcher<ResponseBlogCategoria[]>('blog-category', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return <MainSection categories={resCategories?.data || []} />;
}
