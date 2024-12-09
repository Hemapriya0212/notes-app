import React from 'react';
import { getAuth } from 'firebase/auth';

function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more user information here */}
    </div>
  );
}

export default Profile;
