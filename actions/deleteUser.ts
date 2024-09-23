export async function deleteUser(id: string) {
  try {
    const response = await fetch('/api/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // Pass the user ID in the request body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete user');
    }

    return await response.json(); // Return the response data
  } catch (error) {
    // console.error('Error deleting user:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
}
