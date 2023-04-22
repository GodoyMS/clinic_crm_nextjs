import LayoutMain from "@/components/LayoutMain/LayoutMain"
import LayoutDashboard from "@/components/LayoutDashboard/LayoutDashboard";
import { ProSidebarProvider } from 'react-pro-sidebar';
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import userStore from "@/store/contextUser";
export default function MyApp({ Component, pageProps,router }) {

const getLayout = () => {
    if (router.pathname !== '/' && router.pathname !== '/login' && router.pathname !== '/register' ) {
      return <Provider store={userStore}><ProSidebarProvider><LayoutDashboard><Component {...pageProps} /></LayoutDashboard></ProSidebarProvider></Provider>;
    }  else {
      return <Provider store={userStore}><LayoutMain><Component {...pageProps} /></LayoutMain></Provider>;
    }
  };

  return getLayout();
}

