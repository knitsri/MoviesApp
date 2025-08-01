import { useLocation, useNavigate } from "react-router"

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  return (
   <div
  className={`${
    isHome ? "absolute top-0 left-0 bg-[#131313]/50" : "bg-[#0f0f0f]"
  } w-full p-4 z-50`}
>
  <div className="max-w-[1280px] mx-auto flex justify-between items-center px-4">
    <div className="flex items-center gap-10">
      <img
        src="https://res.cloudinary.com/dndcaj4r2/image/upload/v1753959525/Group_7399_xlevzh.png"
        alt="logo"
        className="w-28 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <p className="cursor-pointer text-white" onClick={() => navigate("/")}>Home</p>
      <p className="cursor-pointer text-white" onClick={() => navigate("/popular")}>Popular</p>
    </div>

    <div className="flex items-center gap-10 text-white text-sm">
      <img
        src="https://img.icons8.com/ios-filled/24/ffffff/search--v1.png"
        alt="search"
        className="w-5 cursor-pointer"
        onClick={() => navigate("/search")}
      />

      <img
        src="https://res.cloudinary.com/dndcaj4r2/image/upload/v1754022348/Avatar_1_qhmkm7.png"
        alt="profile"
        className="w-10 cursor-pointer"
        onClick={() => navigate("/profile")}
      />
    </div>
  </div>
</div>

  );
}

export default Header;
