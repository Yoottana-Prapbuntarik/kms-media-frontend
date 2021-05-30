import Link from 'next/link';
import './footer.scss'
const Footer = ({ footerPresenter }: any) => {
    return (
        <>
            <div className="d-flex footer align-items-center flex-wrap w-100 pb-2 pt-2 justify-content-around mt-5">
                <div className="text-white font-weight-bold text-center">
                    Knowledge Management For  Media © 2019 / All Rights Reserved
            </div>
            </div>

        </>
    )
}

export default Footer