import { twMerge } from 'tailwind-merge';

interface UserImageProps {
  className?: string;
  src?: string;
}

const UserImage = ({ className, src, ...props }: UserImageProps) => {
  return (
    <img
      src={src}
      alt="User Image"
      className={twMerge(
        "rounded-full object-cover border-black border-2",
        className
      )}
    />
  );
};

export default UserImage;
