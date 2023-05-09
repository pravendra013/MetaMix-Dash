// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

// const routes = [
//     {
//       type: "collapse",
//       name: "Dashboard",
//       key: "dashboard",
//       icon: <Icon fontSize="small">dashboard</Icon>,
//       route: "/dashboard",
//       component: <Dashboard />,
//       display: localStorage.getItem("userInfo") ? true : false,
//     },
//     {
//       type: "collapse",
//       name: "Patients",
//       key: "patients",
//       icon: <Icon fontSize="small">monitor_heart</Icon>,
//       route: "/patients",
//       component: <Tables />,
//       display: localStorage.getItem("userInfo") ? true : false,
//     },
//     {
//       type: "collapse",
//       name: "Permissions",
//       key: "permissions",
//       icon: <Icon fontSize="small">key</Icon>,
//       route: "/permissions",
//       component: <Permissions />,
//       display: localStorage.getItem("userInfo") ? true : false,
//     },
//     {
//       type: "collapse",
//       name: "Departments",
//       key: "departments",
//       icon: <Icon fontSize="small">class</Icon>,
//       route: "/departments",
//       component: <Departments />,
//       display: localStorage.getItem("userInfo") ? true : false,
//     },
//     // {
//     //   type: "collapse",
//     //   name: "Billing",
//     //   key: "billing",
//     //   icon: <Icon fontSize="small">receipt_long</Icon>,
//     //   route: "/billing",
//     //   component: <Billing />,
//     // },
//     // {
//     //   type: "collapse",
//     //   name: "RTL",
//     //   key: "rtl",
//     //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
//     //   route: "/rtl",
//     //   component: <RTL />,
//     // },
//     // {
//     //   type: "collapse",
//     //   name: "Notifications",
//     //   key: "notifications",
//     //   icon: <Icon fontSize="small">notifications</Icon>,
//     //   route: "/notifications",
//     //   component: <Notifications />,
//     // },
//     {
//       type: "collapse",
//       name: "Profile",
//       key: "profile",
//       icon: <Icon fontSize="small">person</Icon>,
//       route: "/profile/doctor",
//       component: <Profile />,
//       display: localStorage.getItem("userInfo") ? true : false,
//     },
//     {
//       type: "collapse",
//       name: "Reports",
//       key: "studies",
//       icon: <Icon fontSize="small">folder</Icon>,
//       route: "/studies",
//       component: <Studies />,
//       display: localStorage.getItem("userInfo") ? true : false,
//     },
//     {
//       type: "collapse",
//       name: "Assets",
//       key: "assets",
//       icon: <Icon fontSize="small">view_in_ar_icon</Icon>,
//       route: "/assets",
//       component: <Assets />,
//       display: localStorage.getItem("userInfo") ? true : false,
//     },
//     {
//       type: "collapse",
//       name: "Sign In",
//       key: "sign-in",
//       icon: <Icon fontSize="small">login</Icon>,
//       route: "/authentication/sign-in",
//       component: <SignIn />,
//       display: localStorage.getItem("userInfo") ? false : true,
//     },
//     {
//       type: "collapse",
//       name: "Sign Up",
//       key: "sign-up",
//       icon: <Icon fontSize="small">assignment</Icon>,
//       route: "/authentication/sign-up",
//       component: <SignUp />,
//       display: localStorage.getItem("userInfo") ? false : true,
//     },
//   ];

const App = () => (
    <ThemeCustomization>
        <ScrollTop>
            <Routes />
        </ScrollTop>
    </ThemeCustomization>
);

export default App;
