'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select'; // Import react-select
import debounce from 'lodash/debounce';
import axios from 'axios';

interface User {
  id: string;
  name: string;
}

interface Category {
  label: string;
  icon: string;
  description: string;
}

const CreateListing = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [guestCount, setGuestCount] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [userId, setUserId] = useState('');
  const [userOptions, setUserOptions] = useState<{ label: string; value: string }[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch user options with debounce
  const fetchUserOptions = debounce(async (value: string) => {
    if (value.length < 2) return;

    try {
      const response = await fetch(`/api/users?q=${value}`);
      const users: User[] = await response.json();
      setUserOptions(users.map(user => ({ label: user.name, value: user.id })));
    } catch (error) {
      console.error('Error fetching user options:', error);
    }
  }, 300);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image.');
      return;
    }

    if (!category) {
      alert('Please select a category.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);

      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          imageSrc: data.secure_url,
          category: category.label,
          categoryIcon: category.icon,
          categoryDescription: category.description,
          guestCount: Number(guestCount),
          locationValue,
          userId,
        }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Failed to create listing');
      }
    } catch (error) {
      console.error('An error occurred', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category?.label || ''}
            onChange={(e) => {
              const selected = categories.find((cat) => cat.label === e.target.value);
              setCategory(selected || null);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.label} value={cat.label}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700">
            Guest Count
          </label>
          <input
            type="number"
            id="guestCount"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          />
        </div>
        <div>
          <label htmlFor="locationValue" className="block text-sm font-medium text-gray-700">
            Location Value
          </label>
          <input
            type="text"
            id="locationValue"
            value={locationValue}
            onChange={(e) => setLocationValue(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          />
        </div>
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            User
          </label>
          <Select
            id="userId"
            options={userOptions}
            onInputChange={(inputValue) => fetchUserOptions(inputValue)}
            onChange={(selectedOption) => setUserId(selectedOption?.value || '')}
            placeholder="Type to search users"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 bg-white"
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Create Listing'}
        </button>
      </form>
    </div>
  );
};

export default CreateListing;