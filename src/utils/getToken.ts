import { cookies } from 'next/headers';

export async function getToken() {
  const cookiesStore = await cookies();
  return cookiesStore.get('obstetra_token')?.value;
}
