import { useNavigate } from "react-router-dom";
import { useAuthorization } from "../hook/useAuthorization";

const Profile = () => {
  const navigate = useNavigate();
  useAuthorization(
    `${import.meta.env.VITE_API_URL}/api/account/getaccount`,
    localStorage.getItem("token") ?? "",
    false
  );

  const onClickLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <main className="flex flex-col min-h-screen w-full items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Profile</h1>
        <div className="flex gap-4">
          <button
            className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-blue-500 text-lg font-bold text-white"
            onClick={() => navigate("/employees")}
          >
            Employees
            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
          </button>

          <button
            className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-red-500 text-lg font-bold text-white"
            onClick={onClickLogout}
          >
            Logout!
            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
          </button>
        </div>
      </main>
    </>
  );
};

export default Profile;
