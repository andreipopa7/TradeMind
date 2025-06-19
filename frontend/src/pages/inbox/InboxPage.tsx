import NavBar from "../../components/nav_bar/NavBar";
import SideMenu from "../../components/side_menu/SideMenu";
import '../../styles/GlobalStyles.css';
import '../inbox/InboxPageStyles.css';

const InboxPage: React.FC = () => {
    return (
        <div className="inbox-page">
            <NavBar/>

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu/>
                </div>

                <div className="page-content">
                    <h1>Inbox - Update soon...</h1>
                </div>
            </div>
        </div>
    );
};

export default InboxPage;
