"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Define the type for User objects
interface User {
  id: string;
  name: string;
  points: number;
}

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>([]); // set state type to an array of User objects

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users with their points for the leaderboard
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users?leaderboard=true");
      setUsers(response.data); // TypeScript will now correctly infer this data as User[]
    } catch (error) {
      console.error("Failed to fetch users for the leaderboard", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">User</th>
            <th className="px-4 py-2 border-b">Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border-b">{user.name}</td>
              <td className="px-4 py-2 border-b">{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;