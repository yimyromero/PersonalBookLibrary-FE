import { Outlet } from 'react-router';
import DashFooter from './DashFooter';
import DashHeader from './DashHeader';

const DashLayout = () => {
    return (
        <>
            <DashHeader />
            <div className='@container'>
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}

export default DashLayout;