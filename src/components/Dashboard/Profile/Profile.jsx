import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  //   console.log(user);
  return (
    <section className="bg-[#001f3f]">
      <div className="max-w-6xl px-6 py-10 mx-auto">
        <p className="text-xl font-medium text-blue-500"> <span>User</span> Profile</p>

        <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
          <div className="absolute w-full bg-[#2F4F4F] -z-10 md:h-96 top-24 rounded-2xl"></div>

          <div className="w-full top-24 p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
            <img
              className="h-24 w-24 lg:h-44 lg:w-44 md:mx-6 rounded-full object-cover  shadow-md md:rounded-2xl"
              src={user?.photoURL}
              alt=""
            />

            <div className="mt-2 md:mx-6 ">
              <div>
                <h1 className="text-xl font-medium tracking-tight text-white">
                  {user.displayName}
                </h1>
                <p className="text-blue-200">{user?.email}</p>
              </div>

              <p className="mt-14 text-lg leading-relaxed text-white md:text-xl">
                “Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tempore quibusdam ducimus libero ad tempora doloribus expedita
                laborum saepe voluptas perferendis delectus assumenda”.
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Profile;
