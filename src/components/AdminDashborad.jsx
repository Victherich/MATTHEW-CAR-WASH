
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebaseConfig';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import AdminSignup from './AdminSignUp.jsx';
// // import PostAProduct from './PostAProduct.jsx';
// import AdminProfile from './AdminProfile.jsx';
// // import AllProducts2 from './ManageProducts.jsx';

// // Styled Components
// const DashboardContainer = styled.div`
//   display: flex;
//   min-height: 100vh;
//   background-color: #111827;
//   color: white;
//   overflow: hidden;
// `;

// const Sidebar = styled.div`
//   background: #1f2937;
//   width: ${(props) => (props.isOpen ? '250px' : '0')};
//   overflow: hidden;
//   transition: width 0.3s ease-in-out;
//   display: flex;
//   flex-direction: column;
//   position: fixed;
//   height: 100%;
//   z-index: 7;
//   border-right: 1px solid #374151;

//   @media (min-width: 768px) {
//     width: 250px;
//     position: static;
//     transition: none;
//   }
// `;

// const SidebarHeader = styled.div`
//   padding: 20px;
//   font-size: 1.5rem;
//   text-align: center;
//   font-weight: bold;
//   color: #facc15;
//   border-bottom: 1px solid #374151;
// `;

// const SidebarMenu = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
// `;

// const SidebarMenuItem = styled.li`
//   padding: 15px 20px;
//   cursor: pointer;
//   background: ${(props) => (props.active ? '#374151' : 'transparent')};
//   color: ${(props) => (props.active ? '#facc15' : '#d1d5db')};
//   font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
//   transition: all 0.3s ease-in-out;

//   &:hover {
//     background: #4b5563;
//     color: #facc15;
//   }
// `;

// const ContentArea = styled.div`
//   flex-grow: 1;
//   margin-left: ${(props) => (props.isOpen ? '250px' : '0')};
//   transition: margin-left 0.3s ease-in-out;
//   padding: 2rem;
//   width: 100%;

//   @media(max-width:428px){
//     padding:5px;
//   }
// `;

// const Hamburger = styled.div`
//   position: fixed;
//   top: 50px;
//   left: 5px;
//   background: #facc15;
//   color: #111827;
//   padding: 10px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   z-index: 1100;

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// const Overlay = styled.div`
//   display: ${(props) => (props.isOpen ? 'block' : 'none')};
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 6;
// `;

// // Main Component
// const AdminDashboard = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState('profile');
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Are you sure you want to log out?',
//       text: 'You will need to log in again to access your account.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#facc15',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, log me out',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         signOut(auth)
//           .then(() => {
//             Swal.fire({
//               title: 'Logged Out',
//               text: 'You have been logged out successfully.',
//               icon: 'success',
//               timer: 2000,
//               showConfirmButton: false,
//             });
//             navigate('/adminlogin');
//           })
//           .catch((error) => {
//             Swal.fire('Error', error.message, 'error');
//           });
//       }
//     });
//   };

//   const handleMenuClick = (menu) => {
//     window.scrollTo(0, 0);
//     setActiveMenu(menu);
//     setMenuOpen(false);
//   };

//   const toggleMenu = () => setMenuOpen((prev) => !prev);

//   const renderContent = () => {
//     switch (activeMenu) {
//       case 'profile':
//         return <AdminProfile/>;
//         //  case 'postaproduct':
//         // return <PostAProduct/>;
//         //  case 'manageproducts':
//         // return <AllProducts2/>;
//       case 'adminsignup':
//         return <AdminSignup />;
//       default:
//         return <h1 style={{ color: '#facc15' }}>Dashboard Home</h1>;
//     }
//   };

//   return (
//     <DashboardContainer>
//       <Hamburger onClick={toggleMenu}>
//         {menuOpen ? <FaTimes /> : <FaBars />}
//       </Hamburger>
//       <Overlay isOpen={menuOpen} onClick={() => setMenuOpen(false)} />
//       <Sidebar isOpen={menuOpen}>
//         <SidebarHeader>Admin Dashboard</SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem
//             active={activeMenu === 'profile'}
//             onClick={() => handleMenuClick('profile')}
//           >
//             Hi, Admin
//           </SidebarMenuItem>
//            <SidebarMenuItem
//             active={activeMenu === 'postaproduct'}
//             onClick={() => handleMenuClick('postaproduct')}
//           >
//             Post A Product
//           </SidebarMenuItem>
//           <SidebarMenuItem
//             active={activeMenu === 'manageproducts'}
//             onClick={() => handleMenuClick('manageproducts')}
//           >
//             Manage Products
//           </SidebarMenuItem>
//           <SidebarMenuItem
//             active={activeMenu === 'adminsignup'}
//             onClick={() => handleMenuClick('adminsignup')}
//           >
//             Register Admin
//           </SidebarMenuItem>
//           <SidebarMenuItem onClick={handleLogout}>Logout</SidebarMenuItem>
//         </SidebarMenu>
//       </Sidebar>
//       <ContentArea isOpen={menuOpen}>{renderContent()}</ContentArea>
//     </DashboardContainer>
//   );
// };

// export default AdminDashboard;




import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Assuming you have SweetAlert2 installed
import AdminSignup from './AdminSignUp.jsx'; // Ensure this path is correct
import AdminProfile from './AdminProfile.jsx'; // Ensure this path is correct
import { toggleTheme } from '../Features/Slice.jsx';
// import { use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HostingList from './HostingList.jsx';
import TransactionsList from './TransactionsList.jsx';
import ManageBlogs from './ManageBlogs.jsx';
import ManageServices from './ManageServices.jsx';
import ImageManager from './GalleryImageManager.jsx';
import GalleryImageManager from './GalleryImageManager.jsx';
import ServicesImageManager from './ServicesImageManager.jsx';
import ManageVariableServices from './ManageVariableServices.jsx';
import BookingsDashboard from './BookingsDashboard.jsx';

// --- Light Theme Colors ---
const lightColors = {
  mainBackground: '#F5F7FA',       // Very light blue-gray for the overall dashboard
  sidebarBackground: '#E9EDF2',    // Slightly darker light blue-gray for sidebar
  mainText: '#333333',             // Soft dark gray for general text
  secondaryText: '#666666',         // Medium gray for secondary text/inactive items
  accent: '#0CC1E0',               // A pleasant, not-too-bright blue for accents/active
  accentHover: '#3A7DCF',          // Darker blue for hover states
  activeItemBg: '#DDE6F0',         // Light gray-blue for active sidebar item background
  border: '#D1D9E0',               // Light gray for borders and dividers
};

// Styled Components
const DashboardContainer = styled.div`
// padding-top:50px;
  display: flex;
  min-height: 100vh;
  background-color: ${lightColors.mainBackground}; /* Light mode background */
  color: ${lightColors.mainText}; /* Main text color */
  overflow: hidden;

  @media (max-width: 767px) {
    /* Adjust margin for smaller screens when sidebar is closed */
    margin-left: 0;
  }
`;

const Sidebar = styled.div`
  background: ${lightColors.sidebarBackground}; /* Light mode sidebar background */
  width: ${(props) => (props.isOpen ? '250px' : '0')};
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  z-index: 7;
  border-right: 1px solid ${lightColors.border}; /* Light mode border */

  @media (min-width: 768px) {
    width: 250px;
    position: static;
    transition: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
  color: ${lightColors.accent}; /* Accent color for header text */
  border-bottom: 1px solid ${lightColors.border}; /* Light mode border */
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SidebarMenuItem = styled.li`
  padding: 15px 20px;
  cursor: pointer;
  background: ${(props) => (props.active ? lightColors.activeItemBg : 'transparent')}; /* Active item background */
  color: ${(props) => (props.active ? lightColors.accent : lightColors.secondaryText)}; /* Active/inactive text color */
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${lightColors.activeItemBg}; /* Hover background */
    color: ${lightColors.accent}; /* Hover text color */
  }
`;

const ContentArea = styled.div`
  flex-grow: 1;
  /* On small screens, margin-left is 0 regardless of sidebar open state */
  margin-left: 0;
  ${(props) => props.isOpen && `
    @media (min-width: 768px) {
      margin-left: 250px; /* Only apply margin on larger screens when sidebar is open */
    }
  `}
  // padding: 2rem;
  width: 100%;
  box-sizing: border-box; /* Include padding in width calculation */

  @media(max-width: 767px) {
    /* If sidebar is fixed on mobile, content starts from left edge */
    padding: 1rem; /* Slightly reduced padding for mobile */
  }

  @media(max-width: 428px){
    padding: 0.5rem; /* Further reduced padding for very small screens */
  }
`;

const Hamburger = styled.div`
  position: fixed;
  top: 70px; /* Adjusted top for better placement */
  left: 20px; /* Adjusted left */
  background: ${lightColors.accent}; /* Accent color for hamburger button */
  color: #ffffff; /* White icon on accent background */
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1100;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for button */

  @media (min-width: 768px) {
    display: none;
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Slightly lighter overlay than before */
  z-index: 6;
`;

// Main Component
const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('profile');
  const navigate = useNavigate();
const dispatch = useDispatch();
const theme = useSelector(state=>state.theme)


  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: 'You will need to log in again to access your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: lightColors.accent, // Use accent color for confirm button
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out',
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            Swal.fire({
              title: 'Logged Out',
              text: 'You have been logged out successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            navigate('/adminlogin'); // Redirect to admin login page after logout
          })
          .catch((error) => {
            Swal.fire('Error', error.message, 'error');
          });
      }
    });
  };

  const handleMenuClick = (menu) => {
 if (theme === false) { dispatch(toggleTheme())}

    window.scrollTo(0, 0); // Scroll to top when changing menu
    setActiveMenu(menu);
    setMenuOpen(false); // Close sidebar on menu item click (for mobile)
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const renderContent = () => {
    switch (activeMenu) {
      case 'profile':
        return <AdminProfile />;
      // Uncomment and ensure correct paths for these components when ready

          case 'bookings':
        return <BookingsDashboard/>;
      case 'hostinglist':
        return <HostingList />;
      case 'transactionslist':
        return <TransactionsList />;

         case 'manageservices':
        return <ManageServices />;

           case 'managevariableservices':
        return <ManageVariableServices />;

         case 'manageblogs':
        return <ManageBlogs />;

          case 'managegallery':
        return <GalleryImageManager />;

         case 'servicesimagemanager':
        return <ServicesImageManager />;

      case 'adminsignup':
        return <AdminSignup />;
      default:
        // Default content for the dashboard home, styled for light mode
        return <h1 style={{ color: lightColors.mainText, textAlign: 'center', marginTop: '2rem' }}>Welcome to Your Admin Dashboard</h1>;
    }
  };




//  useEffect(() => {
//   if (theme !== false) {
//     dispatch(toggleTheme()); 
//   }
// }, []);


  return (
    <DashboardContainer>
      <Hamburger onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <Overlay isOpen={menuOpen} onClick={() => setMenuOpen(false)} />
      <Sidebar isOpen={menuOpen}>
        <SidebarHeader onClick={()=>{if (theme === false) { dispatch(toggleTheme())}}}>Admin Dashboard</SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem
            active={activeMenu === 'profile'}
            onClick={() => handleMenuClick('profile')}
          >
            Hi, Admin
          </SidebarMenuItem>
          {/* Uncomment these menu items when their components are implemented */}
            <SidebarMenuItem
            active={activeMenu === 'bookings'}
            onClick={() => handleMenuClick('bookings')}
          >
            Bookings
          </SidebarMenuItem>
          <SidebarMenuItem
            active={activeMenu === 'hostinglist'}
            onClick={() => handleMenuClick('hostinglist')}
          >
            My Hostings
          </SidebarMenuItem>
          <SidebarMenuItem
            active={activeMenu === 'transactionslist'}
            onClick={() => handleMenuClick('transactionslist')}
          >
            My Transactions
          </SidebarMenuItem>

           <SidebarMenuItem
            active={activeMenu === 'manageservices'}
            onClick={() => handleMenuClick('manageservices')}
          >
            Manage Fixed Services
          </SidebarMenuItem>

          
           <SidebarMenuItem
            active={activeMenu === 'managevariableservices'}
            onClick={() => handleMenuClick('managevariableservices')}
          >
            Manage Variable Services
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'servicesimagemanager'}
            onClick={() => handleMenuClick('servicesimagemanager')}
          >
            Manage Services Images
          </SidebarMenuItem>


             <SidebarMenuItem
            active={activeMenu === 'manageblogs'}
            onClick={() => handleMenuClick('manageblogs')}
          >
            Manage Blogs
          </SidebarMenuItem>


          <SidebarMenuItem
            active={activeMenu === 'managegallery'}
            onClick={() => handleMenuClick('managegallery')}
          >
            Manage Gallery Images
          </SidebarMenuItem>
         
          <SidebarMenuItem
            active={activeMenu === 'adminsignup'}
            onClick={() => handleMenuClick('adminsignup')}
          >
            Register Admin
          </SidebarMenuItem>
          <SidebarMenuItem onClick={handleLogout}>Logout</SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      <ContentArea isOpen={menuOpen}>
        {renderContent()}
      </ContentArea>
    </DashboardContainer>
  );
};

export default AdminDashboard;