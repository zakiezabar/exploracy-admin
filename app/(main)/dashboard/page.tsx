import { getUsers } from '@/lib/db';
import { UsersTable } from '../users-table';
import { Search } from '../_components/search';
import Heading from '@/components/ui/heading';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;

  console.log('Search Params:', searchParams); // CHECKING
  
  const { users, newOffset } = await getUsers(search, Number(offset));
  console.log('Fetched Users:', users); // CHECKING

  

  return (
    <main className="w-full flex flex-1 flex-col p-4 md:p-6">
      <Heading title="Users" />
      <div className="w-full mb-4">
        <Search value={searchParams.q} />
      </div>
      <UsersTable users={users} offset={newOffset} />
    </main>
  );
}