import { createContext, useState } from "react";

const ProfileContext = createContext()

const ProfileProvider = ({children}) => {
    const [profileData, setData] = useState(null)

    const setProfileData = (data, profileDataType) => {
        localStorage.setItem(profileDataType, data)
        setData(data)
    }

    const clearProfileData = () => {
        localStorage.clear()
        setData(null)
    }

    return (
        <ProfileContext.Provider value={ {profileData, setProfileData} }>
            {children}
        </ProfileContext.Provider>
    )
}

export { ProfileContext, ProfileProvider };