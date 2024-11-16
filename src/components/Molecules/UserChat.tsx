
import UserImage from '../Atoms/UserImage'
import UserDefaultImage from "@/assets/images/user_default_profile.png"

const UserChat = () => {
  return (
    <button className='flex flex-row items-center gap-5 border-b border-light py-4 px-20'>
        <UserImage src={UserDefaultImage} className='w-16 h-16 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-16 lg:h-16 xl:w-16 xl:h-16 ' />
        <p className='text-base font-semibold text-light'>Jão Pernalonga</p>
    </button>
  )
}

export default UserChat