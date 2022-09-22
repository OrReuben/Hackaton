import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/Dimona_COA.svg.png";
  import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const Sidebar = (props) => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true)
  const navigate = useNavigate()
  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  const redirect = (index) => {
    setSelected(index)
    index === 0 ? navigate('/') : index === 1 ? navigate('/tasks') : navigate('/pi')
  }
  return (
    <>
      <div className="bars" style={expanded?{left: '60 %'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className={`sidebar-${props.themeText}`}
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
          M<span>o</span>ked
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => redirect(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        <div style={{display:"flex",justifyContent:"center"}}>
        <Button variant="contained" onClick={props.toggleTheme} sx={{width:"100px !important"}}>{props.theme}</Button>
        </div>
        <div className="menuItem">
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;