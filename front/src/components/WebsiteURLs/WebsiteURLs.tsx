import React, { useState } from 'react';
import Flag from 'react-world-flags';
import { IoIosArrowDown, IoIosArrowUp, IoLogoAndroid } from 'react-icons/io';
import './WebsiteURLs.css';
import Modal from '../Modal/Modal';
import { SiApple, SiWindows } from 'react-icons/si';
import { PiDownloadBold } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { useAuth } from '../../contexts/AuthContext';

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


interface GlobalSettingType {

}


const REACT_APP_BACK_API = process.env.REACT_APP_BACK_API;

const WebsiteURLs: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [sortOrderDownloads, setSortOrderDownloads] = useState<"asc" | "desc" | "default">("default");
  const [sortOrderDate, setSortOrderDate] = useState<"asc" | "desc" | "default">("default");
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  // for modal functions
  const [pagestatus, setpagestatus] = useState<boolean>(true);
  const [Enabled, setEnabled] = useState<string>('OFF');
  const [domainurl, setDomainurl] = useState<string>('');
  const [Version, setVersion] = useState<string>('V1');
  const [Password, setPassword] = useState<string>('');
  const [SoftwareName, setSoftwareName] = useState<string>('');
  const [ZIPName, setZIPName] = useState<string>('');
  const [OS, setOS] = useState<string[]>([]);
  const [BlockedGEO, setBlockedGEO] = useState<string>('100');
  const [GEO, setGEO] = useState<string>('100');
  const [FileName, setFileName] = useState<string>('');
  const [PatchDownloadLinks, setPatchDownloadLinks] = useState('');
  const [buttonText, setButtonText] = useState<string>('Edit Configuration');
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { isAdmin, setIsAdmin } = useAuth();

  const [mockData, setMockData] = useState<any[]>([]);

  const [GlobalSetting, setGlobalSetting] = useState<GlobalSettingType>({});

  // Function to handle row click
  const handleRowClick = (data: any) => {
    navigate('/see_more', {
      state: {
        domainlink: data.url,
        lastdate: data.lastDownload,
        downloads: data.totalDownloads,
      },
    });
  };



  const handleEditConfigurationClick = () => {
    setShowModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const filteredData = mockData.filter((data) => {
    const matchesFilter = filter === null || (filter === 'live' && data.isLive) || (filter === 'down' && !data.isLive);
    const matchesSearch = data.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry ?
      data.countryName === selectedCountry || data.countryCode === selectedCountry : true; // Check for both name and code
    return matchesFilter && matchesSearch && matchesCountry; // Include country filter in the return statement
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrderDownloads !== 'default') {
      return sortOrderDownloads === 'asc' ? a.totalDownloads - b.totalDownloads : b.totalDownloads - a.totalDownloads;
    }
    if (sortOrderDate !== 'default') {
      const dateA = new Date(a.lastDownload);
      const dateB = new Date(b.lastDownload);
      return sortOrderDate === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
    return 0;
  });

  const handleSortByDownloads = () => {
    setSortOrderDate("default");
    setSortOrderDownloads((prevOrder) => (prevOrder === "default" ? "asc" : prevOrder === "asc" ? "desc" : "default"));
  };

  const handleSortByDate = () => {
    setSortOrderDownloads("default");
    setSortOrderDate((prevOrder) => (prevOrder === "default" ? "asc" : prevOrder === "asc" ? "desc" : "default"));
  };

  const toggleFilter = (newFilter: 'live' | 'down') => {
    setFilter((prevFilter) => (prevFilter === newFilter ? null : newFilter));
  };

  // reset configuration

  // Function to highlight the search term in the URL text
  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false); // Hide dropdown after selection
  };

  const handleAllCountriesSelect = () => {
    setSelectedCountry(''); // Set to empty string to show all countries
    setShowCountryDropdown(false); // Hide dropdown
  };

  // FOR MODAL FUNCTIONS
  const handleToggle = (status: boolean) => {
    setpagestatus(!status); // Toggle the status
  };

  // Set PageStatus to all sites
  const setPageStatusAllSites = async (site: string) => {

    const settingsData = {
      PageStatus: pagestatus ? "OFF" : "ON",
      Enabled: Enabled,
      Password: Password,
      SoftwareName: SoftwareName,
      ZIPName: ZIPName,
      GEO: GEO,
      BlockedGEO: BlockedGEO,
      FileName: FileName,
      OS: OS,
      PatchDownloadLinks: PatchDownloadLinks,
      Version: Version
    }

    try {
      await axios.post(`${site}/api/handleSettings/setSettings.php`, settingsData)
        .then((response) => {
          toast.success(`Settings updated for ${site} successfully!`);
          setButtonText('Reset Configuration');
          setShowModal(false);
        })
        .catch(err => { throw err; });
    } catch (error) {
      console.log(error);
    }
  }


  // get site alive
  const isAlive = async (site: any) => {
    await fetch(site, {
      method: 'GET',
      mode: 'no-cors' // This is used for non-CORS sites; you might want to change it based on your site
    })
      .then((response) => {
        // If the response is ok (status code in the range 200-299)
        if (response.ok || response.status === 0) {
          return true;
        } else {
          return false
        }
      })
      .catch((error) => {
        return true;
      });

  }

  // get download count
  const getDownloadCount = (data: any, country_code: any) => {
    let count: number = 0;
    data.map((el: any) => {
      if (el.country_code === country_code) count++;
    })
    return count;
  }

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


  // get countryCode
  const getCountryCode = (data: any) => {

    const countryCodeCount = data.reduce((acc: { [x: string]: any; }, { country_code }: any) => {
      acc[country_code] = (acc[country_code] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Step 2: Find the country code with the most occurrences
    const mostFrequentCountryCode = Object.keys(countryCodeCount).reduce((a, b) =>
      countryCodeCount[a] > countryCodeCount[b] ? a : b
    );

    return mostFrequentCountryCode;

  }

  // fetch csv info from all sites
  const getInfoFromSites = async (site: any) => {
    const res = await axios.post(`${site.url}/api/getData.php`)
console.log(res.data)
    let tmpData: any = {};

    tmpData.url = site.url;
    tmpData.visitors = res.data.length;
    tmpData.totalDownloads = res.data.filter((el:any) => el.isDownload == 'Downloaded').length;
    tmpData.lastDownload = res.data.reverse().filter((el:any) => el.isDownload == 'Downloaded')[0].date;
    const tmp_country_code: string = getCountryCode(res.data);
    tmpData.countryCode = tmp_country_code;
    tmpData.countryName = getCountryName(tmp_country_code);
    tmpData.downloadCount = getDownloadCount(res.data, tmp_country_code);
    tmpData.isLive = isAlive(site.url);
    tmpData.isReset = site.reset;
    tmpData.who = site.who;

    return tmpData;
  }


  // get ALL DATA
  const getAllData = async () => {

    // Get manageURLS
    const manageURLS = await axios.get(`${REACT_APP_BACK_API}/api/urls`);

    // GET Global Settings
    const settings = await axios.get(`${REACT_APP_BACK_API}/api/get_settings`);
    setGlobalSetting(settings.data);


    let result: any = [];
    for (const data of manageURLS.data) {
      const result0 = await getInfoFromSites(data);
      result.push(result0);
    }
    setMockData(result);
  }


  // Get manageURLS when load page
  React.useEffect(() => {

    getAllData();

  }, []);


  // Reset
  const onReset = async (data: any) => {

    await axios.post(`${REACT_APP_BACK_API}/api/del_individual`, { domain: data })
      .catch(err => console.log(err));


    // Reset setting on this site
    await axios.post(`${data}/api/handleSettings/setSettings.php`, GlobalSetting)
      .then((response) => {
        toast.success(`Settings updated for ${data} successfully!`);
        setButtonText('Reset Configuration');
      })
      .catch(err => { throw err; });

    await getAllData();
  }

  // submit
  const onsubmit = async (e: any) => {
    await setPageStatusAllSites(domainurl)
    await axios.post(`${REACT_APP_BACK_API}/api/set_individual`, { newUrls: [domainurl] })
      .catch(err => console.log(err));

    await getAllData();

  }


  // change Archiving Enabled
  const onEnabled = (e: any) => {
    setEnabled(e.target.value);
  }

  // change Version Enabled
  const onVersion = (e: any) => {
    setVersion(e.target.value);
  }

  // change Password
  const onPassword = (e: any) => {
    setPassword(e.target.value);
  }

  // change SoftwareName
  const onSoftwareName = (e: any) => {
    setSoftwareName(e.target.value);
  }

  // change ZIPName
  const onZIPName = (e: any) => {
    setZIPName(e.target.value);
  }

  const handleOSChange = (os: string, isChecked: boolean) => {
    setOS(prevState => {
      if (isChecked) {
        return [...prevState, os]; // Add the OS if checked
      } else {
        return prevState.filter(item => item !== os); // Remove the OS if unchecked
      }
    });
  };

  // change FileName
  const onFileName = (e: any) => {
    setFileName(e.target.value);
  }

  return (
    <div className="website-urls">
      <div className="header">
        <h2 style={{ color: "#fff" }}>Website URLs ({sortedData.length})</h2>
      </div>
      <div className="url-list">
        <div className="search-section">
          <div className='section_left'>
            <input
              type="text"
              placeholder="Search URLs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
            />
            <div style={{ position: "relative" }}>
              <button style={{ padding: "12px" }} onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
                Search by GEO <IoIosArrowDown />
              </button>

              {showCountryDropdown && (
                <div className="country-dropdown">
                  <div
                    className="country-option"
                    onClick={handleAllCountriesSelect}
                  >
                    All Countries
                  </div>
                  {countries.map((country, index) => (
                    <div
                      key={index}
                      className="country-option"
                      onClick={() => handleCountrySelect(country.code)}
                    >
                      {country.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className='sort_by' style={{ minWidth: "150px" }} onClick={handleSortByDownloads}>
              Sort by Downloads
              {sortOrderDownloads === "asc" && <IoIosArrowUp />}
              {sortOrderDownloads === "desc" && <IoIosArrowDown />}
            </button>

            <button className='sort_by' style={{ minWidth: "110px" }} onClick={handleSortByDate}>
              Sort by Date
              {sortOrderDate === "asc" && <IoIosArrowUp />}
              {sortOrderDate === "desc" && <IoIosArrowDown />}
            </button>
          </div>

          <div className='search_right'>
            <button className='show_live' onClick={() => toggleFilter("live")}>
              {filter === 'live' ? 'Show All' : 'Show Live'}
            </button>
            <button className='show_down' onClick={() => toggleFilter("down")}>
              {filter === 'down' ? 'Show All' : 'Show Down'}
            </button>
          </div>
        </div>

        {sortedData.map((data) => (
          <div className="url-row" key={data.id} onClick={() => handleRowClick(data)}>
            <div className="url-details">
              <a style={{ fontWeight: "500" }} href={data.url}>{highlightMatch(data.url)}</a> {/* Highlighted URL */}
              &nbsp;&nbsp;&nbsp;
              <span style={{color: 'rgb(200, 100, 0)', fontWeight: '500'}}>Visitors: <b>{data.visitors}</b></span>
              <p style={{ margin: "2px", fontWeight: "450" }}>
                  <PiDownloadBold/>&nbsp;&nbsp;
                  <span style={{color: 'rgb(0, 150, 0)'}}>Total Downloads:</span> {data.totalDownloads} | <span style={{color: 'rgb(0, 130, 200)'}}>Last Download:</span> {data.lastDownload}
              </p>
              <p style={{ display: "flex", margin: "2px", fontWeight: "300", fontSize: "14px", justifyContent: "space-between", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", color: "orange", fontWeight: "500" }}>
                  <Flag
                    code={data.countryCode}
                    style={{ width: "24px", height: "18px", marginRight: "8px" }}
                  />
                  {data.countryName} - {data.downloadCount}
                </div>
              </p>
            </div>
            <div style={{paddingTop: '20px', color: '#aaa', marginLeft: '15%'}}>
              Added by {data.who}
            </div>
            <div className="url-actions">
              <button className={data.isLive ? "live" : "down"} onClick={(e) => { e.stopPropagation(); }}>
                {data.isLive ? "Site Live" : "Site Down"}
              </button>
              {isAdmin ? !data.isReset ? (
                <button className="edit" onClick={(e) => {
                  e.stopPropagation(); handleEditConfigurationClick(); setDomainurl(data.url)
                }}>Edit Configuration</button>
              ) : (
                <button className="edit" style={{ width: '120px', background: '#aaa' }} onClick={(e) => {
                  e.stopPropagation();
                  onReset(data.url);
                }}>Reset</button>
              ) : <div></div>
              }
            </div>
          </div>
        ))}
      </div>


      <Modal show={showModal} handleClose={handleCloseModal}>

        <form className="configuration-form">
          <div className="form-group">
            <label>Page Status</label>
            {/* Pass the pagestatus to ToggleSwitch to ensure its state reflectFs the current status */}
            <ToggleSwitch disable={false} onToggle={handleToggle} onArchive={() => { }} initialStatus={!pagestatus} />
          </div>
          <div className="form-group" style={{ marginBottom: "30px" }}>
            <label>Version Enabled</label>
            <select disabled={pagestatus} style={{ opacity: pagestatus ? 0.5 : 1 }} value={Version} onChange={onVersion}>
              <option value="V1">V1</option>
              <option value="V2">V2</option>
              <option value="V3">V3</option>
            </select>
          </div>
          <div className="form-group">
            <label>Archiving Enabled</label>
            <select disabled={pagestatus} style={{ opacity: pagestatus ? 0.5 : 1 }} value={Enabled} onChange={onEnabled}>
              <option value="OFF">OFF</option>
              <option value="ON">ON</option>
            </select>
          </div>
          <div className="form-group">
            <label>Archive Password</label>
            <input
              style={{ width: "268px", opacity: pagestatus ? 0.5 : 1 }}
              type="text"
              placeholder="Optional"
              disabled={pagestatus}
              value={Password}
              onChange={onPassword}
            />
          </div>
          <div className="form-group">
            <label>Set File Name</label>
            <input
              style={{ width: "268px", opacity: pagestatus ? 0.5 : 1 }}
              type="text"
              placeholder="Enter software name"
              disabled={pagestatus}
              value={SoftwareName}
              onChange={onSoftwareName}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "30px" }}>
            <label>Set Archive Name</label>
            <input
              style={{ width: "268px", opacity: pagestatus ? 0.5 : 1 }}
              type="text"
              placeholder="Enter ZIP file name"
              disabled={pagestatus}
              value={ZIPName}
              onChange={onZIPName}
            />
          </div>
          <div className="form-group">
            <label>GEO Blocked (CIS)</label>
            <select
              disabled={pagestatus}
              style={{ opacity: pagestatus ? 0.5 : 1 }}
              value={BlockedGEO}
              onChange={e => setBlockedGEO(e.target.value)}
            >
              {countries.map((country, index) => (
                <option key={index} value={country.code}>{country.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>GEO Whitelist</label>
            <select
              disabled={pagestatus}
              style={{ opacity: pagestatus ? 0.5 : 1 }}
              value={GEO}
              onChange={e => setGEO(e.target.value)}
            >
              {countries.map((country, index) => (
                <option key={index} value={country.code}>{country.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: "30px" }}>
            <label>Operating Systems</label>
            <div className="configuration-checkbox-group">
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <label
                  style={{ opacity: pagestatus ? 0.5 : 1 }} className='configuration-label'><input type="checkbox" disabled={pagestatus}
                    onChange={(e) => handleOSChange('Windows', e.target.checked)} /> <SiWindows /> Windows</label>
                <label
                  style={{ opacity: pagestatus ? 0.5 : 1 }} className='configuration-label'><input type="checkbox" disabled={pagestatus}
                    onChange={(e) => handleOSChange('Android', e.target.checked)} /> <IoLogoAndroid />Android</label>
              </div>
              <div style={{ display: "flex" }}>
                <label
                  style={{ opacity: pagestatus ? 0.5 : 1 }} className='configuration-label'><input type="checkbox" disabled={pagestatus}
                    onChange={(e) => handleOSChange('iOS', e.target.checked)} />  <SiApple />iOS</label>
                <label
                  style={{ opacity: pagestatus ? 0.5 : 1 }} className='configuration-label'><input type="checkbox" disabled={pagestatus}
                    onChange={(e) => handleOSChange('MacOS', e.target.checked)} />  <SiApple />Mac OS</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>File Name (Optional)</label>
            <input
              style={{ width: "268px", opacity: pagestatus ? 0.5 : 1 }}
              type="text"
              placeholder="Enter file name e.g. Cloudflare.exe"
              disabled={pagestatus}
              value={FileName}
              onChange={onFileName}
            />
          </div>
          <div className="form-group">
            <label>Direct File Download Links</label>
            <textarea
              value={PatchDownloadLinks}
              onChange={(e) => setPatchDownloadLinks(e.target.value)}
              placeholder="https://shortlink.com/?s92jw, https://anotherlink.com/?example"
              style={{ opacity: pagestatus ? 0.5 : 1 }}
              disabled={pagestatus}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {/* Disable button hover and click functionality when pagestatus is true */}
          <button
            type="button"
            className="submit-button"
            style={{
              cursor: "pointer"
            }}
            onClick={onsubmit}
          >
            Submit Configuration
          </button>
        </form>
      </Modal>
    </div >
  );
};

export default WebsiteURLs;
