import { useUpdateClassicUser, useGetMyUserClassic } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import profile from "../assets/profile.png"
const UserProfilePage = () => {
        const {currentUser, isLoading: isGetLoading} = useGetMyUserClassic();
        const { updateClassicUser, classicLoading: isUpdateLoading } = useUpdateClassicUser();

        if(isGetLoading)
            {
                return <span>Loading...</span>;
            }

        if(!currentUser)
            {
                return <span>Unable to load user profile!</span>;
            }
        
        return (
            <div className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center" style={{backgroundImage: `url(${profile})`}}>
                <div className="container mx-auto bg-white bg-opacity-75 rounded-lg p-8 max-w-4xl w-full">
                    <UserProfileForm currentUser={currentUser}
                                     onSave={updateClassicUser}
                                    isLoading={isUpdateLoading} />
                </div>
            </div>
        );
};

export default UserProfilePage;
