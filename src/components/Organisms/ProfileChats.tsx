import UserChat from "../Molecules/userChat"


const ProfileChats = () => {
  return (
    <section className="flex flex-row">
      <div className='bg-primary-darker flex flex-col min-h-screen'>
          <UserChat />
          <UserChat />
          <UserChat />
          <UserChat />
          <UserChat />
      </div>
    </section>
  )
}

export default ProfileChats