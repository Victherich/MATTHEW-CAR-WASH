import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Slide down animation
const slideDown = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Slide up animation
const slideUp = keyframes`
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 60px;
  right: 10px;
  z-index: 1000;
  


  @media(max-width:768px){
    top:25px;

    span{
        display:none;
    }
  }

   @media(max-width:428px){
    top:10px;

    span{
        display:none;
    }
  }

  
`;

const MenuButton = styled.div`
  background: #119458;
  // background:rgb(98, 192, 255);
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 25px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  user-select: none;
  transition: 0.3s;

  @media(max-width:768px){
    padding:6px 10px;
  }
  
  &:hover {
    background: #3498db;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 50px;
  right: 0;
  // background:rgba(255,255,255,0.5);
  background: white;
  width: 200px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
  animation: ${({ isOpen }) => (isOpen ? slideDown : slideUp)} 0.4s ease-out;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const MenuItem = styled.li`
  padding: 12px 15px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s;
  color: #333;
  
  &:hover {
    background: lightgray;
  }
`;

// Icons
const menuItems = [
  { name: "🏡 Home", link: "/" },
  { name: "👥 About Us", link: "/aboutus" },
  // { name: "💼 Services", link: "/services" },
  { name: "🖼️ Gallery", link: "/gallery" },
  { name: "📰 Blogs", link: "/blogs" },
  { name: "☎️ Contact Us", link: "/contactus" },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  const closeMenu = (e) => {
    if (!e.target.closest("#menu-container")) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <MenuContainer id="menu-container">
      <MenuButton onClick={toggleMenu} onMouseEnter={()=>setIsOpen(true)}>📜 <span>View</span> Menu</MenuButton>
      <Dropdown isOpen={isOpen}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => {setIsOpen(false);navigate(`${item.link}`)}} >
            {item.name}
          </MenuItem>
        ))}
      </Dropdown>
    </MenuContainer>
  );
};

export default Menu;
