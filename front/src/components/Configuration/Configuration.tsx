import React, { useState } from 'react';
import './Configuration.css';
import { SiApple } from "react-icons/si";
import { IoLogoWindows } from "react-icons/io";
import { IoLogoAndroid } from "react-icons/io";
import { SiMacos } from "react-icons/si";
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import axios from 'axios';
import toast from 'react-hot-toast';
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

const REACT_APP_BACK_API = process.env.REACT_APP_BACK_API;
console.log(REACT_APP_BACK_API)

const Configuration: React.FC = () => {
  const [pagestatus, setpagestatus] = useState<boolean>(true);
  const [archiveStatus, setArchiveStatus] = useState<boolean>(true);
  const [urlCount, setUrlCount] = useState<number>(0);
  const [Enabled, setEnabled] = useState<string>('OFF');
  const [Version, setVersion] = useState<string>('V1');
  const [Password, setPassword] = useState<string>('');
  const [SoftwareName, setSoftwareName] = useState<string>('');
  const [ZIPName, setZIPName] = useState<string>('');
  const [OS, setOS] = useState<string[]>([]);
  const [BlockedGEO, setBlockedGEO] = useState<string>('AM,AZ,BY,KZ,KG,MD,RU,TJ,UZ');
  const [GEO, setGEO] = useState<string>('100');
  const [FileName, setFileName] = useState<string>('');
  const [PatchDownloadLinks, setPatchDownloadLinks] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { isAdmin, setIsAdmin } = useAuth();
  const [whitelistedCountries, setWhitelistedCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [AndroidLink, setAndroidLink] = useState<string>('');
  const [iOSLink, setiOSLink] = useState<string>('');
  const [MacOSLink, setMacOSLink] = useState<string>('');

  const [manageURLS, setManageURLS] = useState<string[]>([]);


  // when toggle PageStatus
  const handleToggle = (status: boolean) => {
    setpagestatus(!status); // Toggle the status
  };

  const handleArchive = (status: boolean) => {
    setArchiveStatus(!status); // Toggle the status
  };

  // Get manageURLS when load page
  React.useEffect(() => {

    const fetchUrls = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACK_API}/api/urls`);
        const preManageURLS = response.data.map((el:any) => el.url);
        setManageURLS(preManageURLS);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }

    };
    fetchUrls();

  }, []);


  // Set Settings to all sites
  const setSettingsToAllSites = async () => {
    
    // send data to server and save
    const settingsData = {
      PageStatus: pagestatus ? "OFF" : "ON",
      Enabled: Enabled,
      Password: Password,
      SoftwareName: SoftwareName,
      ZIPName: ZIPName,
      GEO: whitelistedCountries,
      BlockedGEO: BlockedGEO,
      FileName: FileName,
      OS: OS,
      PatchDownloadLinks: PatchDownloadLinks,
      Version: Version,
      AndroidLink: AndroidLink,
      iOSLink: iOSLink,
      MacOSLink: MacOSLink 
    }

    for (const site of manageURLS) {
      await axios.post(`${site}/api/handleSettings/setSettings.php`, settingsData)
        .then((response) => {
          toast.success(`Settings updated for ${site} successfully!`);
        })
        .catch(err => { throw err; });
    }
  }


  // submit
  const onsubmit = (e: any) => {

    // send data to server and save
    const settingsData = {
      PageStatus: pagestatus ? "OFF" : "ON",
      Enabled: Enabled,
      Password: Password,
      SoftwareName: SoftwareName,
      ZIPName: ZIPName,
      GEO: whitelistedCountries,
      BlockedGEO: BlockedGEO,
      FileName: FileName,
      OS: OS,
      PatchDownloadLinks: PatchDownloadLinks,
      Version: Version,
      AndroidLink: AndroidLink,
      iOSLink: iOSLink,
      MacOSLink: MacOSLink 
    }

    console.log(settingsData);

    axios.post(`${REACT_APP_BACK_API}/api/set_settings`, settingsData)
      .catch(err => console.log(err));

    setSettingsToAllSites();
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

  // Android Link
  const onAndroidLink = (e: any) => {
    setAndroidLink(e.target.value);
  }

  // iOS Link
  const oniOSLink = (e: any) => {
    setiOSLink(e.target.value);
  }

  // MacOs Link
  const onMacOsLink = (e: any) => {
    setMacOSLink(e.target.value);
  }

  // change FileName
  const onFileName = (e: any) => {
    setFileName(e.target.value);
  }

  const handleCountryAdd = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (selectedCountry && !whitelistedCountries.includes(selectedCountry)) {
      setWhitelistedCountries([...whitelistedCountries, selectedCountry]);
      setSelectedCountry("");
    }
  };

  const removeCountry = (countryToRemove: string) => {
    setWhitelistedCountries(whitelistedCountries.filter(country => country !== countryToRemove));
  };

  const handleTextAreaChange = (e: { target: { value: any; }; }) => {
    const links = e.target.value;
    setPatchDownloadLinks(links);

    // Split the input string by commas, then filter out empty or whitespace-only entries
    const linkArray = links.split(',').map((link: string) => link.trim()).filter((link: string | any[]) => link.length > 0);

    // Update the urlCount state with the number of valid URLs
    setUrlCount(linkArray.length);
  };

  if (!isAdmin) {
    return (
      <h2 style={{ color: "#fff" }}>You do not have the necessary permissions to access this page</h2>
    )
  }

  return (
    <div className="configuration-page">
      <div className="configuration-container">
        <h2 className="configuration-title">Configuration</h2>
        <form className="configuration-form">
          <div className="form-group" style={{ flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ opacity: pagestatus ? 0.5 : 1 }}>Page Status</label>
              {/* Pass the pagestatus to ToggleSwitch to ensure its state reflectFs the current status */}
              <ToggleSwitch disable={false} onToggle={handleToggle} onArchive={() => { }} initialStatus={!pagestatus} />
            </div>
            <div style={{ marginBottom: "10px", justifyContent: "space-between", display: "flex", alignItems: 'center', color: "#fff" }}>
              <label style={{ opacity: pagestatus ? 0.5 : 1 }}>Version:</label>
              <select disabled={pagestatus} style={{ opacity: pagestatus ? 0.5 : 1 }} value={Version} onChange={onVersion}>
                <option value="V1">V1</option>
                <option value="V2">V2</option>
                <option value="V3">V3</option>
              </select>
            </div>
          </div>
          <div className="form-group" style={{ flexDirection: 'column' }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label style={{ opacity: archiveStatus ? 0.5 : 1 }} >Archiving Status</label>
              <ToggleSwitch disable={pagestatus} onToggle={() => { }} onArchive={!pagestatus ? handleArchive : () => { }} initialStatus={!pagestatus} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                style={{ width: "230px", opacity: archiveStatus ? 0.5 : 1 }}
                type="text"
                placeholder="Password"
                disabled={pagestatus}
                value={Password}
                onChange={onPassword}
              />
              <input
                style={{ width: "230px", opacity: archiveStatus ? 0.5 : 1 }}
                type="text"
                placeholder="Set File Name (Software Name0"
                disabled={pagestatus}
                value={SoftwareName}
                onChange={onSoftwareName}
              />
              <input
                style={{ width: "230px", opacity: archiveStatus ? 0.5 : 1 }}
                type="text"
                placeholder="Archive Name (e.g Cloudflare zip)"
                disabled={pagestatus}
                value={ZIPName}
                onChange={onZIPName}
              />
            </div>
          </div>
          <div className="form-group" style={{ flexDirection: "column" }}>
            <label style={{ opacity: pagestatus ? 0.5 : 1 }} >GEO Blocked (CIS)</label>
            <textarea style={{ opacity: pagestatus ? 0.5 : 1, height: "17px" }}
                value={
                  countries
                    .map((country: { name: string; code: string }) => 
                      BlockedGEO.split(',')
                        .map((geo: string) => country.code === geo ? country.name : null)
                        .filter(Boolean) // Filter out null values
                    )
                    .flat() // Flatten the array of arrays
                    .join(', ') // Join the resulting array into a string
                } 
                readOnly
            ></textarea>
          </div>
          <div className="form-group" style={{ flexDirection: "column" }}>
            <label style={{ opacity: pagestatus ? 0.5 : 1 }}>Allowed GEO</label>
            <div className="country-select-container">
              <select
                style={{ opacity: pagestatus ? 0.5 : 1 }}
                className="country-select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">Select a country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <button style={{ opacity: pagestatus ? 0.5 : 1 }} className="add-button" onClick={handleCountryAdd}>
                Add
              </button>
            </div>
            <div className="whitelisted-countries">
              {whitelistedCountries.map((country) => (
                <div key={country} className="whitelist-item">
                  {country}
                  <button className="remove-button" onClick={() => removeCountry(country)}>
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group" style={{ display: "flex" }}>
            <div style={{ width: "50%", marginBottom: "10px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "10px" }}>
                <label style={{ opacity: pagestatus ? 0.5 : 1 }}>Set File Name</label>
                <input
                  className='set_file_name'
                  style={{ width: "230px", opacity: pagestatus ? 0.5 : 1, padding: "5px", border: "1px #ffffff7a solid", borderRadius: "4px", backgroundColor: "#565454" }}
                  type="text"
                  placeholder="Enter file name e.g. Cloudflare.exe"
                  disabled={pagestatus}
                  value={FileName}
                  onChange={onFileName}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label style={{ opacity: pagestatus ? 0.5 : 1 }}>Direct File Download Links</label>
                <textarea
                  value={PatchDownloadLinks}
                  onChange={handleTextAreaChange}
                  placeholder="https://shortlink.com/?s92jw, https://anotherlink.com/?example"
                  style={{ opacity: pagestatus ? 0.5 : 1, height: "40px", width: "340px", color: "#fff", backgroundColor: "#565454", border: "1px #ffffff7a solid", borderRadius: "4px", }}
                  disabled={pagestatus}
                />
                <span style={{ opacity: pagestatus ? 0.5 : 1 }}>URLs entered: {urlCount}</span>
              </div>
            </div>
            <div style={{ width: "50%", paddingLeft: '5%' }}>
              <label style={{ opacity: pagestatus ? 0.5 : 1 }}>Operating Systems</label>
              <div className="configuration-checkbox-group">
                <div style={{ display: "flex", flexDirection: "column", marginBottom: "5px" }}>
                  <label
                    style={{ opacity: pagestatus ? 0.5 : 1, fontSize: "15px", display: "flex", gap: "5px" }} className='configuration-label'><input type="checkbox" disabled={pagestatus}
                      onChange={(e) => handleOSChange('Windows', e.target.checked)} /> <IoLogoWindows color='#06daff' /> Windows</label>
                  <label
                    style={{ opacity: pagestatus ? 0.5 : 1, fontSize: "15px", display: "flex", gap: "5px" }} className='configuration-label'><input type="checkbox" disabled={pagestatus}
                      onChange={(e) => handleOSChange('Android', e.target.checked)} /> <IoLogoAndroid color='#54ff00' />Android</label>
                    <div style={{marginBottom: '5px', display: OS.includes('Android') ? 'block' : 'none'}}>
                      <div>Android Link:</div>
                      <input
                        className='set_file_name'
                        style={{ width: "230px", opacity: pagestatus ? 0.5 : 1, padding: "5px", border: "1px #ffffff7a solid", borderRadius: "4px", backgroundColor: "#565454", marginTop: '3px' }}
                        type="text"
                        value={AndroidLink}
                        onChange={onAndroidLink}
                      />
                    </div>
                  <label
                    style={{ opacity: pagestatus ? 0.5 : 1, fontSize: "15px", display: "flex", gap: "5px" }} className='configuration-label'><input type="checkbox" disabled={pagestatus}
                      onChange={(e) => handleOSChange('iOS', e.target.checked)} />  <SiApple color='#222' />iOS</label>
                      <div style={{marginBottom: '5px', display: OS.includes('iOS') ? 'block' : 'none'}}>
                      <div>iOS Link:</div>
                        <input
                          className='set_file_name'
                          style={{ width: "230px", opacity: pagestatus ? 0.5 : 1, padding: "5px", border: "1px #ffffff7a solid", borderRadius: "4px", backgroundColor: "#565454", marginTop: '3px' }}
                          type="text"
                          value={iOSLink}
                          onChange={oniOSLink}
                        />
                      </div>
                  <label
                    style={{ opacity: pagestatus ? 0.5 : 1, fontSize: "15px", display: "flex", gap: "5px" }} className='configuration-label'><input type="checkbox" disabled={pagestatus}
                      onChange={(e) => handleOSChange('MacOS', e.target.checked)} />  <SiMacos />Mac OS</label>
                      <div style={{marginBottom: '5px', display: OS.includes('MacOS') ? 'block' : 'none'}}>
                        <div>Mac OS Link:</div>
                        <input
                          className='set_file_name'
                          style={{ width: "230px", opacity: pagestatus ? 0.5 : 1, padding: "5px", border: "1px #ffffff7a solid", borderRadius: "4px", backgroundColor: "#565454", marginTop: '3px' }}
                          type="text"
                          value={MacOSLink}
                          onChange={onMacOsLink}
                        />
                      </div>
                </div>
              </div>
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {/* Disable button hover and click functionality when pagestatus is true */}
          <div className='form-group'>
            <button
              type="button"
              className="submit-button"
              style={{
                opacity: pagestatus ? 0.5 : 1,
                cursor: "pointer"
              }}
              onClick={onsubmit}
            >
              Submit Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Configuration;
