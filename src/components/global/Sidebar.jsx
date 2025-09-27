import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../store/reducers/sidebarReducer";
import {
  Dashboard as DashboardIcon,
  PeopleAlt as PeopleAltIcon,
  Devices as DevicesIcon,
  CardGiftcard as CardGiftcardIcon,
  BarChart as BarChartIcon,
  CalendarMonth as CalendarMonthIcon,
  AccountCircle as AccountCircleIcon,
  CloudUpload as CloudUploadIcon,
  Settings as SettingsIcon,
  HelpOutline as HelpOutlineIcon,
  Close as CloseIcon,
  MonetizationOn as MonetizationOnIcon,
  HeadsetMic as HeadsetMicIcon,
  Assignment as AssignmentIcon,
  DevicesOther as DevicesOtherIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import "../../assets/style/global/sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const currentUser = useSelector((state) => state.auth.user);
  const { role } = useSelector((state) => state.auth);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [navList, setNavList] = useState("1");
  const location = useLocation();

  const handleResize = useCallback(() => {
    setIsLargeScreen(window.innerWidth >= 992);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    const pathToKeyMap = {
      "/admin/Dashboard": "1",
      "/admin/Employees": "2",
      "/admin/Handsets": "3",
      "/admin/Packages": "4",
      "/admin/Contracts": "5",
      "/admin/Reports": "6",
      "/admin/Calendar": "7",
      "/admin/Profile": "8",

      "/user/Dashboard": "1",
      "/user/Airtime": "2",
      "/user/Devices": "3",
      "/user/Benefits": "4",
      "/user/Profile": "5",
      "/user/Support": "10",
      "/user/SelfHelp": "6",
      "/user/LostForm": "18",
      "/user/Info": "4", // Temporary Staff Info
      "/user/Calendar": "5", // Temporary user calendar
      "/user/SelfHelp/AirtimeBenefitSimulator": "13",
      "/user/SelfHelp/HandsetBenefitSimulator": "17",
      "/user/SelfHelp/Career": "7",
      "/user/SelfHelp/Compensation": "8",
      "/user/SelfHelp/Disrupters": "11",
      "/user/SelfHelp/FAQS": "12",
      "/user/SelfHelp/Videos": "14",
      "/user/SelfHelp/Wellness": "15",
      "/user/SelfHelp/WorkEnvironment": "16",
      "/Settings": "9",
    };

    setNavList(pathToKeyMap[location.pathname]);
  }, [location]);

  const handleNavLinkClick = useCallback(() => {
    if (!isLargeScreen) {
      OpenSidebar();
      dispatch(toggleSidebar());
    }
  }, [isLargeScreen, OpenSidebar, dispatch]);

  const handleSubMenuToggle = useCallback(() => {
    setIsSubMenuOpen((prev) => !prev);
  }, []);

  const renderAdminLinks = () => (
    <>
      {[
        {
          to: "admin/Dashboard",
          icon: <DashboardIcon />,
          label: "Dashboard",
          key: "1",
        },
        {
          to: "admin/Employees",
          icon: <PeopleAltIcon />,
          label: "Employees",
          key: "2",
        },
        {
          to: "admin/Handsets",
          icon: <DevicesIcon />,
          label: "Staff Handset",
          key: "3",
        },
        {
          to: "admin/Packages",
          icon: <DevicesIcon />,
          label: "Packages",
          key: "4",
        },
        {
          to: "admin/Contracts",
          icon: <CardGiftcardIcon />,
          label: "Allocations",
          key: "5",
        },
        {
          to: "admin/Reports",
          icon: <BarChartIcon />,
          label: "Reports",
          key: "6",
        },
        {
          to: "admin/Calendar",
          icon: <CalendarMonthIcon />,
          label: "Calendar",
          key: "7",
        },
        {
          to: "admin/Profile",
          icon: <AccountCircleIcon />,
          label: "Profile",
          key: "8",
        },
      ].map((link) => (
        <NavLink
          key={link.key}
          to={link.to}
          onClick={() => {
            handleNavLinkClick();
            setNavList(link.key);
          }}
        >
          <li
            className={classNames("sidebar-list-item", {
              backNav: navList === link.key,
            })}
          >
            {link.icon} {link.label}
          </li>
        </NavLink>
      ))}
    </>
  );

  const renderUserLinks = () => (
  <>
    {[
      {
        to: "user/Dashboard",
        icon: <DashboardIcon />,
        label: "Dashboard",
        key: "1",
      },
      // {
      //   to: "user/Airtime",
      //   icon: <MonetizationOnIcon />,
      //   label: "My Airtime",
      //   key: "2",
      // },
      {
        to: "user/Handsets",
        icon: <DevicesOtherIcon />,
        label: "My Handsets",
        restrictedTo: "Permanent",
        key: "3",
      },
      {
        to: "user/Benefits",
        icon: <AssignmentIcon />,
        label: "My Benefits",
        restrictedTo: "Permanent",
        key: "4",
      },
      // {
      //   to: "user/LostForm",
      //   icon: <AssignmentIcon />,
      //   label: "Loss Claim",
      //   restrictedTo: "Permanent",
      //   key: "18",
      // },
      {
        to: "user/Profile",
        icon: <AccountCircleIcon />,
        label: "Profile",
        key: "5",
      },
      {
        to: "user/Support",
        icon: <HeadsetMicIcon />,
        label: "Support",
        key: "10",
      },
    ]
      .filter((link) => {
        // Filter out links if restricted and user is not allowed
        return (
          !link.restrictedTo ||
          currentUser.EmploymentCategory !== "Temporary"
        );
      })
      .map((link) => (
        <NavLink
          key={link.key}
          to={link.to}
          onClick={() => {
            handleNavLinkClick();
            setNavList(link.key);
          }}
        >
          <li
            className={classNames("sidebar-list-item", {
              backNav: navList === link.key,
            })}
          >
            {link.icon} {link.label}
          </li>
        </NavLink>
      ))}
    <li
      className={classNames("sidebar-list-item", {
        backNav: navList === "6",
      })}
    >
      <NavLink
        to="user/SelfHelp"
        className={({ isActive }) => classNames("self", { active: isActive })}
        onClick={() => {
          handleNavLinkClick();
          setNavList("6");
        }}
      >
        <span className="self">
          <HelpOutlineIcon /> Self-Help Hub
        </span>
      </NavLink>
      <ArrowDropDownIcon onClick={handleSubMenuToggle} />
    </li>
    <ul className={`sub-menu ${isSubMenuOpen ? "active" : ""}`}>
      {[
        {
          to: "user/SelfHelp/AirtimeBenefitSimulator",
          label: "Airtime Benefit Simulator",
          key: "13",
          restrictedTo: "Permanent",
        },
        {
          to: "user/SelfHelp/HandsetBenefitSimulator",
          label: "Staff Handset Simulator",
          key: "17",
          restrictedTo: "Permanent",
        },
        // Add more items if needed
      ]
        .filter((sublink) => {
          return (
            !sublink.restrictedTo ||
            currentUser.EmploymentCategory !== "Temporary"
          );
        })
        .map((sublink) => (
          <NavLink
            key={sublink.key}
            to={sublink.to}
            onClick={() => {
              handleNavLinkClick();
              setNavList(sublink.key);
            }}
          >
            <li
              className={classNames("sidebar-list-item", {
                backNav: navList === sublink.key,
              })}
            >
              {sublink.label}
            </li>
          </NavLink>
        ))}
    </ul>
  </>
);


  const renderTempUserLinks = () => (
    <>
      {[
        {
          to: "user/Dashboard",
          icon: <DashboardIcon />,
          label: "Dashboard",
          key: "1",
        },
        {
          to: "user/Profile",
          icon: <AccountCircleIcon />,
          label: "Profile",
          key: "2",
        },
        {
          to: "user/Support",
          icon: <HeadsetMicIcon />,
          label: "Support",
          key: "3",
        },
        {
          to: "user/Info",
          icon: <HelpOutlineIcon />,
          label: "Temporary Staff Info",
          key: "4",
        },
        {
          to: "user/Calendar",
          icon: <CalendarMonthIcon />,
          label: "Calendar",
          key: "5",
        },
      ].map((link) => (
        <NavLink
          key={link.key}
          to={link.to}
          onClick={() => {
            handleNavLinkClick();
            setNavList(link.key);
          }}
        >
          <li
            className={classNames("sidebar-list-item", {
              backNav: navList === link.key,
            })}
          >
            {link.icon} {link.label}
          </li>
        </NavLink>
      ))}
    </>
  );

  return (
    <aside
      id="sidebar"
      style={{ width: 278 }}
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <div className="logo-div">
            <h3 className="title">Ambasphere</h3>
          </div>
        </div>
        <span className="close_icon">
          <CloseIcon
            onClick={handleNavLinkClick}
            style={{ fontSize: "2rem", color: "white" }}
          />
        </span>
      </div>
      <hr className="line" />
      <ul className="sidebar-list">
        {role === 1 && renderAdminLinks()}
        {role === 2 && renderAdminLinks()}
        {role === 4 && renderAdminLinks()}
        {role === 5 && renderAdminLinks()}
        {role === 6 && renderAdminLinks()}
        {role === 7 && renderAdminLinks()}

        {role === 3 && renderUserLinks()}
        {role === 8 && renderTempUserLinks()}
        {/* <NavLink
          to="/Settings"
          onClick={() => {
            handleNavLinkClick();
            setNavList("9");
          }}
        >
          <li
            className={classNames("sidebar-list-item", {
              backNav: navList === "9",
            })}
          >
            <SettingsIcon /> Settings
          </li>
        </NavLink> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
