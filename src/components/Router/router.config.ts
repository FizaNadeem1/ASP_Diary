import LoadableComponent from './../Loadable/index';
import { HomeOutlined, UserOutlined, TagsOutlined, AppstoreOutlined, InfoCircleOutlined } from '@ant-design/icons';

export const userRouter: any = [
  {
    path: '/user',
    name: 'user',
    title: 'User',
    component: LoadableComponent(() => import('../../components/Layout/UserLayout')),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: '/user/login',
    name: 'login',
    title: 'LogIn',
    component: LoadableComponent(() => import('../../scenes/Login')),
    showInMenu: false,
  },
  {
    path: '/user/signup', // Define the path for the signup page
    name: 'signup', // Unique name for this route
    title: 'Sign Up', // Display title for the route
    component: LoadableComponent(() => import('../../scenes/Signup')), // Dynamically import the Signup component
    showInMenu: false, // Set to true if you want this route to appear in the menu
  },
  {
    path: '/user/package-list', // Define the path for the signup page
    name: 'package-list', // Unique name for this route
    title: 'Package-list', // Display title for the route
    component: LoadableComponent(() => import('../../scenes/PackageList')), 
    showInMenu: false, // Set to true if you want this route to appear in the menu
  },
  {
    path:  '/user/Success/:session_id',
    name: 'success', // Unique name for this route
    title: 'Success', // Display title for the route
    component: LoadableComponent(() => import('../../scenes/PaymentSuccess')), 
    showInMenu: false, // Set to true if you want this route to appear in the menu
  },
];

export const appRouters: any = [
  {
    path: '/',
    exact: true,
    name: 'home',
    permission: '',
    title: 'Home',
    component: LoadableComponent(() => import('../../components/Layout/AppLayout')),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    permission: '',
    title: 'Dashboard',
    icon: HomeOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Dashboard')),
  },
  {
    path: '/linkGenerate',
    permission: '',
    title: 'TenantLink',
    name: 'TenantLink',
    icon: InfoCircleOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/GenerateLink')),
  },
  {
    path: '/users',
    permission: 'Pages.Users',
    title: 'Users',
    name: 'user',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Users')),
  },
  {
    path: '/roles',
    permission: 'Pages.Roles',
    title: 'Roles',
    name: 'role',
    icon: TagsOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Roles')),
  },
  {
    path: '/tenants',
    permission: 'Pages.Tenants',
    title: 'Tenants',
    name: 'tenant',
    icon: AppstoreOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Tenants')),
  },
  {
    path: '/packages',
    permission: '',
    title: 'Package',
    name: 'packages',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Package')),
  },
  {
    path: '/subscription',
    permission: '',
    title: 'Subscription',
    name: 'subscription',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Subscription')),
  },
  {
    path: '/forums',
    permission: '',
    title: 'Forums',
    name: 'forum',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Forums')),
  },
  {
    path: '/categories',
    permission: '',
    title: 'Categories',
    name: 'category',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/ForumCat')),
  },
  {
    path: '/lawyers',
    permission: '',
    title: 'Lawyer',
    name: 'lawyers',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Lawyer')),
  },
  {
    path: '/caseProceeding',
    permission: '',
    title: 'CaseProceeding',
    name: 'caseProceeding',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/CaseProceeding')),
  },
  {
    path: '/caseRegistration',
    permission: '',
    title: 'CaseRegistration',
    name: 'caseRegistration',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/CaseRegistration')),
  },
  {
    path: '/bench',
    permission: '',
    title: 'Bench',
    name: 'bench',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/bench')),
  },
  {
    path: '/caseTypes',
    permission: '',
    title: 'CaseTypes',
    name: 'caseType',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/CaseTypes')),
  },
  {
    path: '/litigantTypes',
    permission: '',
    title: 'LitigantTypes',
    name: 'litigantTypes',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/LitigantTypes')),
  },
  {
    path: '/designations',
    permission: '',
    title: 'Designations',
    name: 'designations',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Designations')),
  },
  {
    path: '/presidingOfficers',
    permission: '',
    title: 'PresidingOfficers',
    name: 'presidingOfficers',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/PresidingOfficer')),
  },

  {
    path: '/branches',
    permission: '',
    title: 'Branches',
    name: 'branches',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Branch')),
  },
  {
    path: '/firms',
    permission: '',
    title: 'Firms',
    name: 'firms',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Firm')),
  },
  {
    path: '/cities',
    permission: '',
    title: 'City',
    name: 'cities',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/City2')),
  },
  {
    path: '/courts',
    permission: '',
    title: 'Courts',
    name: 'courts',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Court')),
  },
  {
    path: '/provinces',
    permission: '',
    title: 'Province',
    name: 'provinces',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Province')),
  },
  {
    path: '/divisions',
    permission: '',
    title: 'Division',
    name: 'divisions',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Division')),
  },
  {
    path: '/tehsil',
    permission: '',
    title: 'Tehsil',
    name: 'tehsil',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Tehsil')),
  },
  {
    path: '/clients',
    permission: '',
    title: 'Client',
    name: 'clients',
    icon: UserOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Clients')),
  },
  {
    path: '/about',
    permission: '',
    title: 'About',
    name: 'about',
    icon: InfoCircleOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/About')),
  },
  {
    path: '/logout',
    permission: '',
    title: 'Logout',
    name: 'logout',
    showInMenu: false,
    component: LoadableComponent(() => import('../../components/Logout')),
  },
  {
    path: '/exception?:type',
    permission: '',
    title: 'exception',
    name: 'exception',
    showInMenu: false,
    component: LoadableComponent(() => import('../../scenes/Exception')),
  },
];

export const routers = [...userRouter, ...appRouters];
