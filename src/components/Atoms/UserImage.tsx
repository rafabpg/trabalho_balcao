import { twMerge } from 'tailwind-merge';

interface UserImageProps {
    className?: string;
    src?: string;
}

const UserImage = ({className,src,...props}:UserImageProps) => {
  return (
    <img
      src={src}
      alt="User Image"
      className={twMerge( "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-60 xl:h-60 rounded-full object-cover border-black border-2",className)}
    />
  );
};

export default UserImage;