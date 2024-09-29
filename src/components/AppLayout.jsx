import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import StarterLogo from './StarterLogo';
import Header from './Header';
import Footer from '../pages/Footer';
import { useState } from 'react';

// React Icons
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { RiArrowUpSLine } from 'react-icons/ri';
import { TbHeart } from 'react-icons/tb';
import { HiOutlineUser } from 'react-icons/hi';
import { FaCirclePlus } from 'react-icons/fa6';
import { MdNotificationsNone } from 'react-icons/md';
import { GoHome } from 'react-icons/go';

export default function AppLayout({
  displayStarterLogo,
  updateFavorite,
  displayAddProduct,
  displayArrowUp,
  handleArrowUp,
}) {
  return (
    <div>
      {displayStarterLogo && <StarterLogo />}
      <Header updateFavorite={updateFavorite} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <MenuBottom updateFavorite={updateFavorite} />
      <AddProductIcon disp={displayAddProduct} />
      <ArrowUp disp={displayArrowUp} func={handleArrowUp} />
    </div>
  );
}

const MenuBottom = ({ updateFavorite }) => {
  const [displayMenuBottom, setDisplayMenuBottom] = useState(true);
  const [initialScroll, setInitialScroll] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  window.addEventListener('scroll', () => {
    if (window.scrollY > initialScroll) {
      setInitialScroll(window.scrollY);
      setDisplayMenuBottom(false);
    } else if (window.scrollY < initialScroll) {
      setDisplayMenuBottom(true);
    }
  });

  // Functions
  function selectMenuBottom(menu) {
    if (location.pathname === menu) {
      return true;
    }
  }

  return (
    <div
      className={`${
        displayMenuBottom ? 'bottom-0 opacity-100' : '-bottom-14 opacity-0'
      } hidden sm:flex justify-between items-center px-2 fixed bg-blue-200 h-20 z-20 w-full text-gray-600 transition-all duration-[.75s] ease-in-out`}
    >
      <div
        className={`${
          selectMenuBottom('/products')
            ? 'border-orange-500 text-gray-700 rounded-t'
            : 'text-gray-500'
        } h-full pt-2 border-t-[4px] border-blue-200 px-2`}
      >
        <GoHome
          onClick={() => navigate('/products')}
          className="text-3xl hover:text-gray-700 cursor-pointer"
        />
      </div>
      <div
        className={`relative ${
          selectMenuBottom('/favorite')
            ? ' border-orange-500 text-gray-700 rounded-t'
            : 'text-gray-500'
        }  h-full pt-2 border-t-[4px] border-blue-200 px-2`}
      >
        <TbHeart
          onClick={() => navigate('/favorite')}
          className="text-3xl hover:text-gray-700 cursor-pointer"
        />
        <span className="absolute bg-orange-500 text-white font-semibold px-1 leading-none  rounded-full -top-[4px] right-[3px] mt-2">
          {updateFavorite}
        </span>
      </div>
      <div
        className={`relative ${
          selectMenuBottom('/add-product')
            ? ' border-orange-500 text-gray-700 rounded-t'
            : 'text-gray-500'
        }  h-full pt-2 border-t-[4px] border-blue-200 px-2`}
      >
        <FaCirclePlus
          onClick={() => navigate('/add-product')}
          className="text-4xl text-orange-500 hover:text-orange-600 cursor-pointer"
        />
      </div>
      <div
        className={`${
          selectMenuBottom('/notification')
            ? 'border-orange-500 text-gray-700 rounded-t'
            : 'text-gray-500'
        } h-full pt-2 border-t-[4px] border-blue-200 px-2`}
      >
        <MdNotificationsNone
          onClick={() => navigate('/notification')}
          className="text-3xl hover:text-gray-700 cursor-pointer"
        />
      </div>
      <div
        className={`${
          selectMenuBottom('/user-signin')
            ? 'border-orange-500 text-gray-700 rounded-t'
            : 'text-gray-500'
        } h-full pt-2 border-t-[4px] border-blue-200 px-2`}
      >
        <HiOutlineUser
          onClick={() => navigate('/user-signin')}
          className="text-3xl hover:text-gray-700 cursor-pointer"
        />
      </div>
    </div>
  );
};

const AddProductIcon = (props) => {
  const navigate = useNavigate();
  // Functions
  function handleAddProduct() {
    navigate('/add-product');

    sessionStorage.setItem('redirectUrl', window.location.href);
  }

  return (
    <>
      {props.disp && (
        <div className="fixed right-10 bottom-16 z-20 sm:right-4 md:right-6 sm:hidden">
          <AiOutlineAppstoreAdd
            onClick={handleAddProduct}
            className="text-5xl cursor-pointer text-orange-400 hover:text-orange-500 sm:text-4xl md:text-4xl"
          />
        </div>
      )}
    </>
  );
};

const ArrowUp = (props) => {
  return (
    <>
      {props.disp && (
        <div
          onClick={props.func}
          className="fixed right-10 bottom-16 bg-blue-50 rounded-sm cursor-pointer hover:bg-blue-100 z-20 sm:right-4 md:right-6"
        >
          <RiArrowUpSLine className="text-5xl cursor-pointer text-blue-400 sm:text-4xl md:text-4xl" />
        </div>
      )}
    </>
  );
};
