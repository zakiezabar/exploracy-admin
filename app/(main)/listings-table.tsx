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
import { SelectListing } from '@/lib/types';
import { deleteUser } from '@/actions/deleteUser';
import { useRouter } from 'next/navigation';

interface ListingsTableProps {
  listings: SelectListing[] | null; // Proper type for listings
  offset: number | null;
}

export function ListingsTable({ listings, offset }: ListingsTableProps) {
  const router = useRouter();

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
            {listings && listings.length > 0 ? (
              listings.map((listing: SelectListing) => ( // Use proper type for `listing`
                <ListingRow key={listing.id} listing={listing} /> // Correct key and listing prop
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No listings found
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

interface ListingRowProps {
  listing: SelectListing; // Proper type for listing prop
}

function ListingRow({ listing }: ListingRowProps) {
  const router = useRouter();

  async function handleDelete() {
    try {
      await deleteUser(listing.id);
      router.refresh();
    } catch (error) {
      // console.error("Failed to delete user", error);
    }
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{listing.imageSrc}</TableCell>
      <TableCell className="hidden md:table-cell">{listing.title}</TableCell>
      <TableCell className="font-medium text-black">{listing.category}</TableCell>
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
}
