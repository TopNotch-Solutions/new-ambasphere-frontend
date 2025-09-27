import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { switchRole } from "../../store/reducers/authReducer";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const RoleSwitcher = ({title}) => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  const handleSwitchRole = () => {
   
    if (title === "User") {
       dispatch(switchRole(3));
      navigate(`/user/dashboard`, { replace: true });
    } else {
      dispatch(switchRole(1));
      navigate(`/admin/dashboard`, { replace: true });
    }
  };

  return (
    <div>
      
        <Button
          color="primary"
          onClick={handleSwitchRole}
          style={{
            fontSize: "14px",
            backgroundColor: "#0096D6",
            color: "#fff",
            padding: "8px",
            paddingLeft: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            borderColor: "#1A69AC",
            border: "1px solid",
          }}
        >
          Switch to {title}
        </Button>
      
      <Outlet />
    </div>
  );
};

export default RoleSwitcher;
