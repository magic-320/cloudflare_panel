import React, { useState, useEffect, useMemo } from 'react';
import './CountryList.css';
import Flag from 'react-world-flags';
import { RiEdgeFill } from "react-icons/ri";
import { FaFirefoxBrowser } from "react-icons/fa6";
import { SiApple, SiBrave, SiWindows } from "react-icons/si";
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';  // Sorting arrows
import { PiGoogleChromeLogo } from "react-icons/pi";
import { AiOutlineLinux } from 'react-icons/ai';
import { IoLogoAndroid } from 'react-icons/io5';
import { FaWindows } from "react-icons/fa6";
import { ImDownload3 } from "react-icons/im";
import { TbMessageCircleCancel } from "react-icons/tb";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { GrLinkPrevious } from "react-icons/gr";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const countries = [
    { name: "Worldwide", code: "100" },
    { name: "Afghanistan", code: "AF" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "Andorra", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Antigua and Barbuda", code: "AG" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Azerbaijan", code: "AZ" },
    { name: "Bahamas", code: "BS" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Barbados", code: "BB" },
    { name: "Belarus", code: "BY" },
    { name: "Belgium", code: "BE" },
    { name: "Belize", code: "BZ" },
    { name: "Benin", code: "BJ" },
    { name: "Bhutan", code: "BT" },
    { name: "Bolivia", code: "BO" },
    { name: "Bosnia and Herzegovina", code: "BA" },
    { name: "Botswana", code: "BW" },
    { name: "Brazil", code: "BR" },
    { name: "Brunei", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cabo Verde", code: "CV" },
    { name: "Cambodia", code: "KH" },
    { name: "Cameroon", code: "CM" },
    { name: "Canada", code: "CA" },
    { name: "Central African Republic", code: "CF" },
    { name: "Chad", code: "TD" },
    { name: "Chile", code: "CL" },
    { name: "China", code: "CN" },
    { name: "Colombia", code: "CO" },
    { name: "Comoros", code: "KM" },
    { name: "Congo (Congo-Brazzaville)", code: "CG" },
    { name: "Costa Rica", code: "CR" },
    { name: "Croatia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Cyprus", code: "CY" },
    { name: "Czechia (Czech Republic)", code: "CZ" },
    { name: "Denmark", code: "DK" },
    { name: "Djibouti", code: "DJ" },
    { name: "Dominica", code: "DM" },
    { name: "Dominican Republic", code: "DO" },
    { name: "Ecuador", code: "EC" },
    { name: "Egypt", code: "EG" },
    { name: "El Salvador", code: "SV" },
    { name: "Equatorial Guinea", code: "GQ" },
    { name: "Eritrea", code: "ER" },
    { name: "Estonia", code: "EE" },
    { name: "Eswatini (fmr. Swaziland)", code: "SZ" },
    { name: "Ethiopia", code: "ET" },
    { name: "Fiji", code: "FJ" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia", code: "GM" },
    { name: "Georgia", code: "GE" },
    { name: "Germany", code: "DE" },
    { name: "Ghana", code: "GH" },
    { name: "Greece", code: "GR" },
    { name: "Grenada", code: "GD" },
    { name: "Guatemala", code: "GT" },
    { name: "Guinea", code: "GN" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Honduras", code: "HN" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Ireland", code: "IE" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Jamaica", code: "JM" },
    { name: "Japan", code: "JP" },
    { name: "Jordan", code: "JO" },
    { name: "Kazakhstan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: "Kiribati", code: "KI" },
    { name: "Kuwait", code: "KW" },
    { name: "Kyrgyzstan", code: "KG" },
    { name: "Laos", code: "LA" },
    { name: "Latvia", code: "LV" },
    { name: "Lebanon", code: "LB" },
    { name: "Lesotho", code: "LS" },
    { name: "Liberia", code: "LR" },
    { name: "Libya", code: "LY" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Malaysia", code: "MY" },
    { name: "Maldives", code: "MV" },
    { name: "Mali", code: "ML" },
    { name: "Malta", code: "MT" },
    { name: "Marshall Islands", code: "MH" },
    { name: "Mauritania", code: "MR" },
    { name: "Mauritius", code: "MU" },
    { name: "Mexico", code: "MX" },
    { name: "Micronesia", code: "FM" },
    { name: "Moldova", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Mongolia", code: "MN" },
    { name: "Montenegro", code: "ME" },
    { name: "Morocco", code: "MA" },
    { name: "Mozambique", code: "MZ" },
    { name: "Myanmar (formerly Burma)", code: "MM" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Netherlands", code: "NL" },
    { name: "New Zealand", code: "NZ" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "North Korea", code: "KP" },
    { name: "North Macedonia", code: "MK" },
    { name: "Norway", code: "NO" },
    { name: "Oman", code: "OM" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Panama", code: "PA" },
    { name: "Papua New Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Peru", code: "PE" },
    { name: "Philippines", code: "PH" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Qatar", code: "QA" },
    { name: "Romania", code: "RO" },
    { name: "Russia", code: "RU" },
    { name: "Rwanda", code: "RW" },
    { name: "Saint Kitts and Nevis", code: "KN" },
    { name: "Saint Lucia", code: "LC" },
    { name: "Saint Vincent and the Grenadines", code: "VC" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tome and Principe", code: "ST" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia", code: "RS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Solomon Islands", code: "SB" },
    { name: "Somalia", code: "SO" },
    { name: "South Africa", code: "ZA" },
    { name: "South Korea", code: "KR" },
    { name: "South Sudan", code: "SS" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Sudan", code: "SD" },
    { name: "Suriname", code: "SR" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Syria", code: "SY" },
    { name: "Tajikistan", code: "TJ" },
    { name: "Tanzania", code: "TZ" },
    { name: "Thailand", code: "TH" },
    { name: "Timor-Leste", code: "TL" },
    { name: "Togo", code: "TG" },
    { name: "Tonga", code: "TO" },
    { name: "Trinidad and Tobago", code: "TT" },
    { name: "Tunisia", code: "TN" },
    { name: "Turkey", code: "TR" },
    { name: "Turkmenistan", code: "TM" },
    { name: "Tuvalu", code: "TV" },
    { name: "Uganda", code: "UG" },
    { name: "Ukraine", code: "UA" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States of America", code: "US" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Vanuatu", code: "VU" },
    { name: "Vatican City", code: "VA" },
    { name: "Venezuela", code: "VE" },
    { name: "Vietnam", code: "VN" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" }
];


interface VisitorData {
    id: number;
    dateVisit: string;
    os: string;
    ipAddress: string;
    domainVisited: string;
    browser: string;
    downloadingStatus: string;
    sessionStatus: string;
    action: string;
    countrycode: string;
    countryname: string;
}


const getOsIcon = (os: string) => {
    switch (os) {
        case 'Windows 11':
            return <SiWindows />;
        case 'Windows':
            return <FaWindows />;
        case 'MacOS':
            return <SiApple />;
        case 'Linux':
            return <AiOutlineLinux />;
        case 'Android':
            return <IoLogoAndroid />;
        default:
            return null;
    }
};


const CountryList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(100);
    const [currentItems, setCurrentItems] = useState<VisitorData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof VisitorData, direction: 'asc' | 'desc' } | null>(null);
    const location = useLocation()
    const { domainlink, lastdate, downloads, who, visitors } = location.state

    const [visitorData, setVisitorData] = useState<VisitorData[]>([]);

    // get countryName
    const getCountryName = (data: string) => {
        // Loop through the countries and return the name if a match is found
        for (let el of countries) {
            if (el.code === data) {
                return el.name;  // Return the country name if the code matches
            }
        }
        return null; // Return null if no match is found
    }

    const sortedData = useMemo(() => {
        let sortableData = [...visitorData];
        if (sortConfig !== null) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableData;
    }, [sortConfig, visitorData]);


    useEffect(() => {

        axios.get(`${domainlink}/api/getData.php`)
            .then(res => {
                const newVisitorData = res.data.map((el: any, index: any) => ({
                    id: index + 1,
                    dateVisit: el.date,
                    os: el.os,
                    ipAddress: el.ip,
                    browser: el.browser,
                    downloadingStatus: el.isDownload,
                    sessionStatus: "Active",
                    countrycode: el.country_code,
                    countryname: getCountryName(el.country_code),
                }));
                setVisitorData(newVisitorData); // Update the state
            })
            .catch(err => console.log(err));

    }, [])



    useEffect(() => {
        const filteredData = sortedData.filter(data =>
            data.id.toString().includes(searchQuery) ||
            data.dateVisit.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.ipAddress.includes(searchQuery) ||
            data.browser.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.downloadingStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.sessionStatus.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const reversedData = filteredData.reverse();
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const items = reversedData.slice(indexOfFirstItem, indexOfLastItem);

        setCurrentItems(items);
    }, [currentPage, itemsPerPage, searchQuery, sortedData, visitorData]);
    // Add visitorData here

    const totalPages = Math.ceil(visitorData.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleSort = (key: keyof VisitorData) => {
        setSortConfig((prevState) => {
            // If there's no sortConfig or we're changing the sort key, start with ascending
            if (!prevState || prevState.key !== key) {
                return { key, direction: 'asc' };
            }

            // If currently ascending, change to descending
            if (prevState.direction === 'asc') {
                return { key, direction: 'desc' };
            }

            // If currently descending, reset to default (unsorted)
            if (prevState.direction === 'desc') {
                return null; // Return null to reset the sorting (default state)
            }

            return { key, direction: 'asc' }; // Fallback, start over with ascending
        });
    };

    const dateSort = (key: keyof VisitorData) => {
        setSortConfig((prevState) => {
            // If there's no sortConfig or we're changing the sort key, start with ascending
            if (!prevState || prevState.key !== key) {
                return { key, direction: 'asc' }; // Default to ascending
            }

            // Toggle between ascending and descending
            return {
                key,
                direction: prevState.direction === 'asc' ? 'desc' : 'asc',
            };
        });
    };

    const getSortIcon = (key: keyof VisitorData) => {
        if (!sortConfig || sortConfig.key !== key) {
            return null; // No icon if not sorted or different column
        }

        // Show appropriate icon based on the sort direction
        if (sortConfig.direction === 'asc') {
            return <IoIosArrowUp />;
        } else if (sortConfig.direction === 'desc') {
            return <IoIosArrowDown />;
        }

        return null; // Default (unsorted) state
    };

    const highlightText = (text: string, query: string) => {
        if (!query) return text;

        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="highlight">{part}</span>
            ) : part
        );
    };

    return (
        <div className="table-container">
            <div style={{ margin: "30px 0px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <Link to="/analytics" className='back_button'>
                        <GrLinkPrevious /> Back
                    </Link>
                    <h3 style={{ margin: "0px", display: "flex", alignItems: "center", color: "#339be7", height: "25px" }}>{domainlink}</h3>
                </div>
                <div className='infomationbox'>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontWeight: "500" }}>
                        <span>Injected by: </span><span style={{ color: "yellow" }}>{who}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontWeight: "500" }}>
                        <span>Visitors: </span><span style={{ color: "#49c949" }}>{visitors}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontWeight: "500" }}>
                        <span>Downloads: </span><span>{downloads}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        <span style={{ fontWeight: "500" }}>Last Download: </span><span style={{ fontWeight: "50" }}>{lastdate}</span>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
                <input
                    style={{
                        width: "200px",
                        padding: "10px",
                        borderRadius: "6px",
                    }}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button className="sort_by_date" onClick={() => dateSort('dateVisit')}>
                    Sort by date
                </button>
            </div>
            <div className="settings">
                <div className="pagination">
                    <button
                        className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        <TbPlayerTrackPrevFilled />
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <TbPlayerTrackNextFilled />
                    </button>
                </div>
                <div>
                    <select id="items-per-page" value={itemsPerPage} onChange={handleItemsPerPageChange} style={{
                        marginLeft: "10px",
                        padding: "5px",
                        borderRadius: "3px",
                        background: "#333",
                        border: "#fff, solid, 1px",
                        color: "#fff"
                    }}>
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                        <option value={300}>300</option>
                    </select>
                </div>
            </div>
            <table style={{ overflow: "auto" }}>
                <thead style={{ overflow: "auto" }}>
                    <tr style={{ backgroundColor: "#898888b3", color: "#fff" }}>
                        <th style={{ minWidth: "170px" }} onClick={() => handleSort('dateVisit')}>
                            <span className='th_span_icon'>
                                User ID & Date
                            </span>
                        </th>
                        <th style={{ minWidth: "130px" }}>IP</th>
                        <th style={{ minWidth: "170px" }}>GEO</th>
                        <th style={{ width: "140px", minWidth: "130px" }} onClick={() => handleSort('os')}>
                            <span className='th_span_icon'>
                                OS {getSortIcon('os')}
                            </span>
                        </th>
                        <th style={{ minWidth: "210px" }} onClick={() => handleSort('browser')}>
                            <span className='th_span_icon'>
                                Browser {getSortIcon('browser')}
                            </span>
                        </th>
                        <th style={{ minWidth: "170px", width: "130px" }} onClick={() => handleSort('downloadingStatus')}>
                            <span className='th_span_icon'>
                                Downloading Status {getSortIcon('downloadingStatus')}
                            </span>
                        </th>
                        {/* <th style={{ minWidth: "130px", width: "90px" }} onClick={() => handleSort('sessionStatus')}>
                            <span className='th_span_icon'>
                                Session Status {getSortIcon('sessionStatus')}
                            </span>
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((data) => (
                        <tr key={data.id} className='table-row'>
                            <td>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span>
                                        {highlightText(Number(data.id).toString(), searchQuery)}
                                    </span>
                                    <span>
                                        {highlightText(data.dateVisit, searchQuery)}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <a href={`https://ipinfo.io/${data.ipAddress}`} target="_blank" rel="noopener noreferrer" className='ip_a' style={{ color: "#fff" }}>
                                        {highlightText(data.ipAddress, searchQuery)}
                                    </a>
                                </span>
                            </td>
                            <td >
                                <span style={{ display: "flex", alignItems: "center" }}>
                                    <Flag
                                        code={data.countrycode}
                                        style={{ width: "24px", height: "18px", marginRight: "8px" }}
                                    />
                                    <span>{data.countryname}</span>
                                </span>
                            </td>
                            <td>
                                <span style={{ display: "flex", alignItems: "center" }}>{getOsIcon(data.os)}<span style={{ marginLeft: "15px" }}>{highlightText(data.os, searchQuery)}</span></span>
                            </td>
                            <td>
                                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    {data.browser.includes('Chrome') ? <PiGoogleChromeLogo /> :
                                        data.browser.includes('Firefox') ? <FaFirefoxBrowser /> :
                                            data.browser.includes('Edge') ? <RiEdgeFill /> : <SiBrave />}
                                    <span style={{ marginLeft: "5px" }}>{highlightText(data.browser, searchQuery)}</span>
                                </span>
                            </td>
                            <td>
                                <span style={{ display: "flex", alignItems: "center", gap: "15px" }}>{data.downloadingStatus === 'Downloaded' ? <ImDownload3 /> : <TbMessageCircleCancel />}
                                    {highlightText(data.downloadingStatus, searchQuery)}
                                </span>
                            </td>
                            {/* <td>
                                <span className={`status-dot ${data.sessionStatus === 'Active' ? 'status-online' : 'status-offline'}`}></span>
                                {highlightText(data.sessionStatus, searchQuery)}
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CountryList;