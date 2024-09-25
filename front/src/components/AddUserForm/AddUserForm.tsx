import React, { useState, FormEvent } from 'react';

interface AddUserFormProps {}

interface User {
    username: string;
    passkey: string;
}

const AddUserForm: React.FC<AddUserFormProps> = () => {
    const [username, setUsername] = useState<string>('');
    const [passkey, setPasskey] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const newUser: User = {
            username,
            passkey,
        };

        try {
            const response = await fetch('http://localhost:5000/api/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(result.message);
                setUsername(''); // Clear form
                setPasskey('');
            } else {
                setMessage(result.message || 'Error adding user');
            }
        } catch (error) {
            setMessage('Failed to add user. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Add User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="passkey" className="block mb-2 text-sm font-medium text-gray-700">Passkey</label>
                    <input
                        type="password"
                        id="passkey"
                        value={passkey}
                        onChange={(e) => setPasskey(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    Add User
                </button>
            </form>

            {message && <div className="mt-4 text-center text-sm text-green-600">{message}</div>}
        </div>
    );
};

export default AddUserForm;
