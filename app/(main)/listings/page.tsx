'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import Modal from '@/components/ui/modal';
// import EditListing from './editListing/[id]/page';
import EditListingForm from '@/components/edit-listing-form';
import Image from 'next/image';

// Define the Listing type based on your Prisma schema
interface Listing {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  public: boolean;
  approved: boolean;
  user?: {
    name?: string;
  };
}

// Helper function to truncate description
const truncateDescription = (description: string, wordLimit: number = 30) => {
  const words = description.split(' ');
  if (words.length <= wordLimit) return description;
  return words.slice(0, wordLimit).join(' ') + '...';
};

const ListingPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [filter] = useState<'all' | 'public' | 'private'>('all');
  const [approvalFilter, setApprovalFilter] = useState<'all' | 'approved' | 'unapproved'>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingListingId, seEditingListingId] = useState<string | null>(null);
  const router = useRouter();

  // Fetch listings from the API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        // console.error('Failed to fetch listings', error);
      }
    };

    fetchListings();
  }, []);

  // Handle delete listing
  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted listing from the state
        setListings((prevListings) => prevListings.filter((listing) => listing.id !== id));
      } else {
        // console.error('Failed to delete listing');
      }
    } catch (error) {
      // console.error('An error occurred', error);
    } finally {
      setIsDeleting(null);
    }
  };

  // Handle toggle public status
  // const handleTogglePublic = async (id: string) => {
  //   try {
  //     const response = await fetch(`/api/listings/${id}/status`, {
  //       method: 'PATCH',
  //     });
  //     if (response.ok) {
  //       const updatedListing = await response.json();
  //       setListings((prevListings) =>
  //         prevListings.map((listing) =>
  //           listing.id === id ? { ...listing, public: updatedListing.public } : listing
  //         )
  //       );
  //     } else {
  //       console.error('Failed to update listing status');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred', error);
  //   }
  // };

  // Handle approve listing
  const handleApproveListing = async (id: string) => {
    try {
      const response = await fetch(`/api/listings/${id}/approve`, {
        method: 'PATCH',
      });
      if (response.ok) {
        const updatedListing = await response.json();
        setListings((prevListings) =>
          prevListings.map((listing) =>
            listing.id === id ? { ...listing, approved: updatedListing.approved } : listing
          )
        );
      } else {
        // console.error('Failed to approve listing');
      }
    } catch (error) {
      // console.error('An error occurred', error);
    }
  };

  // Handle unapprove listing
  const handleUnapproveListing = async (id: string) => {
    try {
      const response = await fetch(`/api/listings/${id}/unapprove`, {
        method: 'PATCH',
      });
      if (response.ok) {
        const updatedListing = await response.json();
        setListings((prevListings) =>
          prevListings.map((listing) =>
            listing.id === id ? { ...listing, approved: updatedListing.approved } : listing
          )
        );
      } else {
        // console.error('Failed to unapprove listing');
      }
    } catch (error) {
      // console.error('An error occurred', error);
    }
  };

  // // Filter listings based on the selected filter
  // const filteredListings = listings.filter((listing) => {
  //   if (filter === 'all') return true;
  //   if (filter === 'public') return listing.public;
  //   if (filter === 'private') return !listing.public;
  // });

  // Filter listings based on the selected filter
  const filteredListings = listings.filter((listing) => {
    const filterMatch =
      filter === 'all' || (filter === 'public' && listing.public) || (filter === 'private' && !listing.public);
    const approvalFilterMatch =
      approvalFilter === 'all' ||
      (approvalFilter === 'approved' && listing.approved) ||
      (approvalFilter === 'unapproved' && !listing.approved);
    return filterMatch && approvalFilterMatch;
  });

  // Handle open modal for editing listing
  const handleOpenModal = (id: string) => {
    seEditingListingId(id);
    setIsModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    seEditingListingId(null);
    setIsModalOpen(false);
  };

  // Handle submit from modal
  // const handleSubmit = async () => {
  //   const response = await fetch(`/api/listings/${editingListingId}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       // Include your form data here
  //     }),
  //   });
  //   if (response.ok) {
  //     // Close the modal and refresh the listings or update the state
  //     setIsModalOpen(false);
  //     // Fetch listings again or update the state with the new data
  //   } else {
  //     // console.error('Failed to update listing');
  //   }
  // };
  
  return (
    <div className="w-full flex flex-1 flex-col p-4 md:p-6">
      <Heading title="Listings" subtitle="Manage all listings"/>
      <div className="mb-2 flex flex-row justify-between">
        {/* Approval Filter Buttons */}
        <div className="mb-6 flex space-x-4">
          <Button
            onClick={() => setApprovalFilter('all')}
            variant={approvalFilter === 'all' ? 'secondaryOutline' : 'ghost'}
            size={'sm'}
            className='normal-case font-semibold'
          >
            All
          </Button>
          <Button
            onClick={() => setApprovalFilter('approved')}
            variant={approvalFilter === 'approved' ? 'secondaryOutline' : 'ghost'}
            size={'sm'}
            className='normal-case font-semibold'
          >
            Approved
          </Button>
          <Button
            onClick={() => setApprovalFilter('unapproved')}
            variant={approvalFilter === 'unapproved' ? 'secondaryOutline' : 'ghost'}
            size={'sm'}
            className='normal-case font-semibold'
          >
            Pending Approval
          </Button>
        </div>
        <Button
          onClick={() => router.push('listings/createListing')}
          variant={'primary'}
          // className="mt-4 w-40"
        >
          Create New Listing
        </Button>
      </div>
      
      {/* Filter Buttons */}
      {/* <div className="mb-4 flex space-x-4">
        <Button
          onClick={() => setFilter('all')}
          // className={`px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          //   filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'
          // }`}
          variant={filter === 'all' ? 'secondaryOutline' : 'ghost'}
          size={'sm'}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter('public')}
          variant={filter === 'public' ? 'secondaryOutline' : 'ghost'}
          size={'sm'}
        >
          Public
        </Button>
        <Button
          onClick={() => setFilter('private')}
          variant={filter === 'private' ? 'secondaryOutline' : 'ghost'}
          size={'sm'}
        >
          Private
        </Button>
      </div> */}
      
      <ul className="space-y-2">
        {filteredListings.map((listing) => (
          <li key={listing.id} className="bg-white p-4 rounded-lg border">
            <div className='flex flex-row gap-4'>
              <div className="rounded-md w-24 h-24">
                {listing.imageSrc && (
                  <Image
                    src={listing.imageSrc}
                    alt={listing.title}
                    className="rounded-lg object-cover"
                    width={800} // Replace with actual width
                    height={800} // Replace with actual height
                  />
                )}
              </div>
              <div className='flex flex-col w-full'>
                <div className='flex flex-row justify-between'>
                  <h2 className="text-md font-semibold">{listing.title}</h2>
                  <p className="text-sm text-slate-400">{listing.public ? 'Public activity' : 'Private activity'}</p>
                </div>
                
                <p className="text-md text-gray-700">{truncateDescription(listing.description)}</p>
                <p className="text-sm text-slate-500">By: {listing.user?.name || 'Unknown'}</p>
                <div className="mt-4 flex space-x-4 justify-end">
                  <Button
                    onClick={() => handleOpenModal(listing.id)}
                    variant={'default'}
                    size={'sm'}
                  >
                    {/* <a href={`listings/editListing/${listing.id}`}> */}
                      Edit
                    {/* </a> */}
                  </Button>
                  <Button
                    onClick={() => handleDelete(listing.id)}
                    disabled={isDeleting === listing.id}
                    variant={isDeleting === listing.id ? 'dangerOutline' : 'danger'}
                    size={'sm'}
                    // className={`px-4 py-2 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    //   isDeleting === listing.id ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                    // }`}
                  >
                    {isDeleting === listing.id ? 'Deleting...' : 'Delete'}
                  </Button>
                  {!listing.approved ? (
                  <Button
                    onClick={() => handleApproveListing(listing.id)}
                    variant={'secondary'}
                    size={'sm'}
                  >
                    Approve
                  </Button>
                  ) : (
                    <Button
                      onClick={() => handleUnapproveListing(listing.id)}
                      variant={'secondaryOutline'}
                      size={'sm'}
                    >
                      Unapprove
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* Modal for editing listing */}
      {editingListingId && (
        <Modal
          title="Edit Listing"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          body={<EditListingForm id={editingListingId} onClose={handleCloseModal} />}
          fullscreen={true}
        />
      )}
    </div>
  );
};

export default ListingPage;