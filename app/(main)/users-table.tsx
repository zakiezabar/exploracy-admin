"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SelectUser } from '@/lib/types';
import { deleteUser } from '@/actions/deleteUser';
import { useRouter } from 'next/navigation';

export function UsersTable({
  users,
  offset
}: {
  users: SelectUser[] | null | any;
  offset: number | null;
}) {
  const router = useRouter();

  // Debugging log to check the props
  console.log('Users Table Props:', { users, offset });

  // Function to handle pagination click
  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden md:table-cell">CreatedAt</TableHead>
              <TableHead className="hidden md:table-cell">Listings</TableHead>
              <TableHead className="hidden md:table-cell">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user:any) => (
                <UserRow key={user.id} user={user} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {offset !== null && (
        <div className="grid justify-items-end">
          <Button
            className="mt-4 w-40"
            variant="link"
            onClick={() => onClick()}
          >
            Next Page
          </Button>
        </div>
      )}
    </>
  );
}

// Component to render each user row
function UserRow({ user }: { user: SelectUser }) {
  const router = useRouter();

  // Handle the delete action for the user
  async function handleDelete() {
    try {
      await deleteUser(user.id);
      router.refresh(); // Refresh the page to reflect changes
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  }

  console.log('Rendering UserRow for:', user); // Debugging log

  // Format the creation date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium'
  }).format(new Date(user.createdAt));

  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
      <TableCell className="font-medium">{user.role}</TableCell>
      <TableCell className="font-medium">{formattedDate}</TableCell>
      <TableCell className="font-medium">{user.listings}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="danger"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};