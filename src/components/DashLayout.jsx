import { Outlet } from 'react-router';
import DashFooter from './DashFooter';
import DashHeader from './DashHeader';
import DashAside from './DashAside';

const DashLayout = () => {
    return (
        <div className='min-h-screen grid grid-cols-12 grid-rows-[70px_1fr] bg-slate-200'>
            <DashAside />
            <DashHeader/>
            <div className='col-start-3 row-start-2 col-span-10 m-5 rounded'>
                <Outlet />
            </div>
            {/* <DashFooter /> */}
        </div>
    )
}

export default DashLayout;