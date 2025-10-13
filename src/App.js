
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import ContactUs from './components/ContactUs';
import DonatePage from './components/DonatePage';
import AboutPage from './components/AboutPage';
import ScrollToTop from './components/ScrollToTop';
import MatthewBlogs from './components/Blogs';
// import AuthenticityPage from './components/AuthenticityPage';
import Gallery from './components/Gallery';
import INECEngagement from './components/INECEngagement';
import wp from './Images/whatsapplogo.png'
import fb from './Images/fb.png'
import ins from './Images/ins.png'
import SupportUsComponent from './components/SupportUsComponent';
import ArticleDetail from './components/ArticleDetail';
import AppUpdate from './components/AppUpdate';
import HostingExpiryGuard from './components/HostingExpiryGuard';
import AdminSignup from './components/AdminSignUp';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashborad';
import PrivateAdminDashboard from './components/PrivateAdminDashboard';
import AdminForgotPassword from './components/AdminForgotPassword';
import AdminResetPassword from './components/AdminResetPassword';

import GoogleTranslate from './components/GoogleTranslate';
import BookingPage from './components/BookingModal';


function App() {
  return (
 
    <BrowserRouter>
      <HostingExpiryGuard/>
    <GoogleTranslate/>
     <AppUpdate/>
    <ScrollToTop/>
    <Header/>
    <Menu/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/donate' element={<DonatePage/>}/>
        <Route path="/aboutus" element={<AboutPage/>}/>
        <Route path = '/blogs' element={<MatthewBlogs/>}/>
        {/* <Route path='/authenticity' element={<AuthenticityPage/>}/> */}
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/inecengagement' element={<INECEngagement/>}/>
        <Route path='/blog/:articleId' element={<ArticleDetail/>}/>
        {/* <Route path='/bookingpage' element={<BookingPage/>}/> */}


   {/* Admin routes */}

     <Route path='/admindashboard' element={<PrivateAdminDashboard/>}>
          <Route path='' element={<AdminDashboard/>}/>
        </Route>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        {/* <Route path='/adminsignup' element={<AdminSignup/>}/> */}
        <Route path='/adminforgotpassword' element={<AdminForgotPassword/>}/>
        <Route path='/adminresetpassword' element={<AdminResetPassword/>}/>



      </Routes>
      {/* <a><img src={fb} alt="logo" className="WhatsAppIcon1" onClick={() => window.open("https://wa.me/", "_blank")} /></a>  */}
      {/* <a><img src={ins} alt="logo" className="WhatsAppIcon2" onClick={() => window.open("https://wa.me/", "_blank")} /></a>  */}
    
      <a><img src={wp} alt="logo" className="WhatsAppIcon" onClick={() => window.open("https://wa.me/971568307510", "_blank")} /></a> 
    {/* <SupportUsComponent/> */}
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
