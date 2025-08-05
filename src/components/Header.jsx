
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const isMovieDetails = location.pathname.includes("/movies/");
  const isSearchPage = location.pathname === "/search";
  const isTransparent = isHome || isMovieDetails;
  const { searchValue, onChange, onClickSearch } = props;

  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    if (isSearchPage) {
      onClickSearch();
    } else {
      navigate("/search");
    }
  }

  return (
    <div
      className={`${
        isTransparent
          ? "absolute top-0 left-0 bg-[#131313]/50"
          : "bg-[#0f0f0f]"
      } w-full p-4 z-50`}
    >
      <div className="w-full flex justify-between items-center px-4 md:max-w-[1280px] md:mx-auto">
        <div className="flex items-center gap-4 md:gap-10">
          <img
            src="https://res.cloudinary.com/dndcaj4r2/image/upload/v1753959525/Group_7399_xlevzh.png"
            alt="logo"
            className="w-20 md:w-28 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="hidden md:flex items-center gap-10">
            <p className="cursor-pointer text-white" onClick={() => navigate("/")}>Home</p>
            <p className="cursor-pointer text-white" onClick={() => navigate("/popular")}>Popular</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-white text-sm">
          {isSearchPage && (
            <input
              type="search"
              value={searchValue}
              onChange={onChange}
              autoFocus
              placeholder="Search movies"
              className="bg-gray-700 text-white ml-2 sm:ml-4 pl-2 sm:pl-3 pr-3 py-1 rounded outline-none placeholder-gray-400 w-[120px] xs:w-[140px] sm:w-[180px] md:w-[240px]"
            />
          )}

          <div className="flex items-center gap-2 sm:gap-4 ">
            <img
              src="https://img.icons8.com/ios-filled/24/ffffff/search--v1.png"
              alt="search"
              className="w-5 h-5 cursor-pointer"
              onClick={handleClick}
            />

            <img
              src="https://res.cloudinary.com/dndcaj4r2/image/upload/v1754022348/Avatar_1_qhmkm7.png"
              alt="profile"
              className="w-8 h-8 md:w-10 md:h-10 cursor-pointer hidden md:block"
              onClick={() => navigate("/profile")}
            />

            <button
              className="md:hidden focus:outline-none p-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src="https://img.icons8.com/ios-filled/24/ffffff/menu--v1.png"
                alt="menu"
                className="w-5 h-5 min-w-[20px]" 
              />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0f0f0f] px-6 py-4 space-y-4 text-white">
          <p className="cursor-pointer" onClick={() => {navigate("/"); setIsOpen(false);}}>Home</p>
          <p className="cursor-pointer" onClick={() => {navigate("/popular"); setIsOpen(false);}}>Popular</p>
          <p className="cursor-pointer" onClick={() => {navigate("/profile"); setIsOpen(false);}}>Profile</p>
        </div>
      )}
    </div>
  );
}

export default Header;