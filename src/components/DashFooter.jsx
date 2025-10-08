import { useNavigate, useLocation } from "react-router";
import { HomeIcon } from "@heroicons/react/24/solid";

const DashFooter = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const onGoHomeClicked = () => navigate('/dash');

    let goHomeButton = null;
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                title='Home'
                onClick={onGoHomeClicked}
            >
            <HomeIcon className="size-6 text-red-500" />
            </button>
        )
    }

    const content = (
        <footer>
            {goHomeButton}
            <p>Copyright@2025</p>
        </footer>
    );
    return content;
}

export default DashFooter;