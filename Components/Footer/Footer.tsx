import Link from 'next/link';
import './footer.scss'
const Footer = ({ footerPresenter }: any) => {
    return (
        <>
            <div className="d-flex footer align-items-center flex-wrap w-100 pb-2 pt-2 justify-content-around">
                <div className="text-white font-weight-bold">
                    © 2019 Nattraphak.com
            </div>
                <div>
                    <div className="d-flex">
                        <div className="d-flex flex-wrap justify-content-center">
                            <div className="d-flex align-items-center h-100 text-white font-weight-bold">
                                #NattraphakPhatai
                        </div>
                            <div className="d-flex flex-wrap">
                                {

                                    footerPresenter.socialContact.map((items, idx: number) => {
                                        return (
                                            <Link href={items.routePath} key={idx}>
                                                <a className="pl-3">
                                                    <img src={items.socialImages} className="img-icon-social" alt="social items" />
                                                </a>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer