import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import { getCurrentUser } from '../../lib/auth';
import Classes from '@/components/classes';
import { redirect } from 'next/navigation';

export default async function ClassesPage() {

  const req = {
    cookies: {
      get: (name: string) => ({ value: headers().get(`cookie`)?.split('; ').find(row => row.startsWith(`${name}=`))?.split('=')[1] }),
    },
  } as NextRequest;

  const user = await getCurrentUser(req);

  if (!user) {
    redirect('/auth');
  }

  return (
    <div>
      {user && <Classes clientId={user.id.toString()} trainerId={''} />}
    </div>
  );
}