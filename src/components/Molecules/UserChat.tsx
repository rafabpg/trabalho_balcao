import UserImage from '../Atoms/UserImage';
import UserDefaultImage from '@/assets/images/user_default_profile.png';

interface UserChatProps {
  userName: string;
  message: string;
  category: string;
  date: string;
  isNew?: boolean;
}

const UserChat: React.FC<UserChatProps> = ({ userName, message, category, date, isNew = false }) => {
  return (
    <button className="flex flex-row items-center justify-between gap-4 border-b border-gray-300 py-2 px-4 w-full hover:bg-gray-100">
      <div className="flex items-center gap-3">
        <UserImage src={UserDefaultImage} className="w-16 h-16 rounded-full" />
        <div className="text-left">
          <p className="text-sm font-semibold text-primary-darker">
            {userName}{' '}
            <span className="text-gray-400 text-xs font-normal">({category})</span>
          </p>
          <p className={`text-xs ${isNew ? 'text-blue-500 font-semibold' : 'text-gray-500'}`}>
            {message}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-xs text-gray-400">{date}</p>
        {isNew && <div className="bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</div>}
      </div>
    </button>
  );
};

export default UserChat;
