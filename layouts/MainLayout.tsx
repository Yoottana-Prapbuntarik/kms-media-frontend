import Nav from "../Components/Navigation/NavigationContainer";
import Footer from "../Components/Footer/FooterContainer";
import './styles.scss';
import { useRouter } from 'next/router'
const MainLayout = (props: any) => {
    const router = useRouter()
    const isHide = router.asPath === '/signin' || router.asPath === '/signup' ? true : false
    return (
        <div className="d-flex flex-column">
            <div className={isHide ? 'd-none' : 'w-100'}>
                <Nav />
            </div>
            <div>
                <div className=" d-flex justify-content-center content">
                    {props.children}
                </div>
                <div className={isHide ? 'd-none' : 'd-flex align-items-center w-100'}>
                    <Footer />
                </div>
            </div >
        </div >
    )
}

export default MainLayout