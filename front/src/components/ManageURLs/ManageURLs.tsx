// src/components/ManageURLs.tsx
import React, { useState, useEffect } from 'react';
import './ManageURLs.css';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const REACT_APP_BACK_API = process.env.REACT_APP_BACK_API;


// Define the type for each URL object
type UrlData = {
    url: string;
    date: string;
    who: string;
    reset: number;
};


const ManageURLs: React.FC = () => {
    const [urls, setUrls] = useState<string>(''); // To track the textarea input
    const [validUrls, setValidUrls] = useState<UrlData[]>([]); // To store valid URLs
    const [errorMessage, setErrorMessage] = useState<string>(''); // To display errors if URLs are invalid
    const [showWebsites, setShowWebsites] = useState<boolean>(false); // To toggle website list visibility
    const [RealTime, setRealTime] = useState<number>(0);
    const { userName, setUserName } = useAuth();

    // Improved regex to validate URLs
    const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9\-]+(\.[a-zA-Z]{2,})+)(\/\S*)?$/;

    // Fetch the URLs from the server when the component mounts
    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BACK_API}/api/urls`);
                // setValidUrls(response.data);
                setValidUrls(response.data);
            } catch (error) {
                console.error('Error fetching URLs:', error);
            }
        };

        fetchUrls();
    }, [RealTime]);

    // Handler to update textarea value
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUrls(e.target.value);
        setErrorMessage(''); // Clear error message when input changes
    };

    // Handler to validate and add URLs
    const handleAddUrls = async () => {
        const urlArray = urls.split('\n').map(url => url.trim()).filter(url => url); // Split textarea input by line and remove empty lines
        const invalidUrls = urlArray.filter(url => !(urlPattern.test(url) && (url.includes('http://') || url.includes('https://')))); // Check if any URL is invalid

        if (invalidUrls.length > 0) {
            setErrorMessage(`Invalid URLs: ${invalidUrls.join(', ')}`); // Show error if URLs are invalid
        } else {
            try {
                // Send the valid URLs to the backend to be saved in the CSV
                axios.post(`${REACT_APP_BACK_API}/api/set_urls`, { newUrls: urlArray, who: userName })
                    .then(res => setRealTime(Math.random()))

                // setRealTime(Math.random());


                // Update the local state with the new URLs
                // setValidUrls(prev => [...prev, ...urlArray]);

                setUrls(''); // Clear textarea
                setShowWebsites(false); // Hide websites list after adding new URLs
            } catch (error) {
                console.error('Error saving URLs:', error);
                setErrorMessage('Error saving URLs');
            }
        }
    };

    // Toggle websites list visibility
    const toggleWebsitesList = () => {
        setShowWebsites(!showWebsites);
    };

    // Handler to remove a URL with confirmation
    const handleRemoveUrl = async (index: number) => {
        
        const urlToRemove = validUrls[index].url;

        // Confirmation popup
        const confirmDelete = window.confirm(`Are you sure you want to delete the website: ${urlToRemove}?`);
        if (!confirmDelete) return;

        try {
            // Remove URL from the backend
            await axios.post(`${REACT_APP_BACK_API}/api/urls`, {removeURL: urlToRemove});

            // Update the local state by filtering out the removed URL
            setValidUrls(prev => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error deleting URL:', error);
            setErrorMessage('Error deleting URL');
        }
    };

    // Get the count of URLs entered
    const urlsCount = urls.split('\n').filter(url => url.trim()).length;

    return (
        <div className="manage-urls">
            <h2 style={{ color: "#fff", marginLeft: "15px" }}>Manage URLs</h2>
            <div className='area_content'>
                <h4 style={{ color: "#fff" }}>Add Website URL</h4>

                {/* Textarea with counter in the corner */}
                <div className="textarea-container" style={{ position: "relative" }}>
                    <textarea
                        placeholder="Enter website URLs (one per line)"
                        value={urls}
                        onChange={handleTextareaChange}
                        style={{ width: "calc(100% - 23px)", height: "500px", padding: "10px" }}
                    ></textarea>
                    {/* Counter in the top-right corner */}
                    <div style={{ position: "absolute", top: "5px", right: "5px", color: "#222" }}>
                        {urlsCount} URL{urlsCount !== 1 ? 's' : ''}
                    </div>
                </div>

                {/* Error message display */}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <div className="buttons">
                    <button className="btn-green" onClick={handleAddUrls}>
                        Add URLs
                    </button>
                    <button className="btn-blue" onClick={toggleWebsitesList}>
                        {showWebsites ? 'Hide Websites' : `Show Websites (${validUrls.length})`}
                    </button>
                </div>

                {/* Conditionally display the websites list */}
                {/* {showWebsites && validUrls.length > 0 && (
                    <div className="website-list">
                        <h4 style={{ color: "#fff" }}>Added Websites</h4>
                        <ul style={{ color: "#fff" }}>
                            {validUrls.map((url, index) => (
                                <li key={index}>{url}</li>
                            ))}
                        </ul>
                    </div>
                )} */}
                {showWebsites && validUrls.length > 0 && (
                    <div className="website-list">
                        <h4 style={{ color: "#fff" }}>Added Websites</h4>
                        <ul style={{ color: "#fff", listStyleType: "none", padding: 0 }}>
                            {validUrls.map((url, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ccc', listStyleType: "number" }} >
                                    <div>
                                        <span style={{ fontWeight: 'bold', marginRight: "10px" }}>{index + 1}.</span>
                                        <span style={{ fontWeight: 'bold' }}>{url.url}</span>
                                        <span style={{ marginLeft: '10px', fontStyle: 'italic' }}>Added on: {url.date}</span>
                                        <span style={{ marginLeft: '10px', color: '#999' }}>by {url.who}</span>
                                    </div>
                                    <button
                                        className='delete_url_btn'
                                        onClick={() => handleRemoveUrl(index)}
                                    >
                                        X
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageURLs;
