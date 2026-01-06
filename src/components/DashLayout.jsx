import { Outlet } from 'react-router';
import DashFooter from './DashFooter';
import DashHeader from './DashHeader';
import DashAside from './DashAside';

const DashLayout = () => {
    return (
        <div className='min-h-screen grid
         grid-cols-[56px_1fr]
         lg:grid-cols-[240px_1fr]
         grid-rows-[70px_1fr] bg-slate-200'>
            <DashAside />
            <DashHeader/>
            <div className='m-5 rounded'>
                <Outlet />
            </div>
            {/* <DashFooter /> */}
        </div>
    )
}

export default DashLayout;