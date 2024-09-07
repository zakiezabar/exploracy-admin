'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// interface EditListingProps {
//   id: string;
// }

// const EditListing: React.FC<EditListingProps> = ({ id }) => {

  const EditListing: React.FC = () => {
    // Get the ID from the URL parameters
    const { id } = useParams();
  // State variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [category, setCategory] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [userId, setUserId] = useState('');

  // Use Next.js router for navigation
  const router = useRouter();
  // Get the search parameters from the URL
  // const { id } = useParams();

  // Fetch the existing listing details to prefill the form
  useEffect(() => {
    const fetchListing = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/listings/${id}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched data:', data); // Debug: Log the fetched data
            setTitle(data.title);
            setDescription(data.description);
            setPrice(data.price);
            setImageSrc(data.imageSrc);
            setCategory(data.category);
            setGuestCount(data.guestCount);
            setLocationValue(data.locationValue);
            setUserId(data.userId); // Pre-fill the user ID
          } else {
            console.error('Failed to fetch listing details');
          }
        } catch (error) {
          console.error('An error occurred', error);
        }
      }
    };

    fetchListing();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      console.error('Listing ID is missing');
      return;
    }

    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          imageSrc,
          category,
          guestCount: Number(guestCount),
          locationValue,
          userId, // Include userId in the payload
        }),
      });
      if (response.ok) {
        // Navigate to the dashboard page after successful update or..
        // Close the modal and refresh the listings
        router.push('/listings');
      } else {
        console.error('Failed to update listing');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  // Render the form
  return (
    <div className="w-full flex flex-1 flex-col p-4 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <Input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          />
        </div>
        <div>
          <label htmlFor="imageSrc" className="block text-sm font-medium text-gray-700">
            Image Source
          </label>
          <Input
            type="text"
            id="imageSrc"
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <Input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          />
        </div>
        <div>
          <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700">
            Guest Count
          </label>
          <Input
            type="number"
            id="guestCount"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          />
        </div>
        <div>
          <label htmlFor="locationValue" className="block text-sm font-medium text-gray-700">
            Location Value
          </label>
          <Input
            type="text"
            id="locationValue"
            value={locationValue}
            onChange={(e) => setLocationValue(e.target.value)}
            // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          />
        </div>
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <Input
            type="text"
            id="userId"
            value={userId}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 shadow-sm sm:text-sm text-gray-800"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          variant={'primary'}
          
        >
          Update Listing
        </Button>
      </form>
    </div>
  );
};

export default EditListing;