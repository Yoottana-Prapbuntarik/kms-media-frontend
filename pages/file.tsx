import MainLayout from '../layouts/MainLayout'
import Head from 'next/head'
import './css/page-file.scss'
import Link from "next/link";
const File = () => {
    return (
        <MainLayout>
            <Head>
                <title>
                    ส่งเอกสารออนไลน์
                </title>
            </Head>

            <div className="container-fluid mt-5 mx-5 upload-file">
                <h1 className="text-center my-5">
                    Upload file
                </h1>
                <div className="row  my-5">
                    <div className="col-lg-4 col-md-6 col-12 mt-5">
                        <Link href="/file/mdt">
                            <a>
                                <div className="bg-mdt mx-auto p-5" style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
                                    <h1 className="text-white font-72px">
                                        MDT
                                </h1>
                                    <h1 className="text-white font-36px">
                                        Media
                                </h1>
                                    <h1 className="text-white font-36px">
                                        Technology
                                </h1>
                                </div>
                            </a>
                        </Link>
                        <div className="px-3 bg-gray-light py-3 d-flex justify-content-end" style={{ borderBottomLeftRadius: "15px", borderBottomRightRadius: "15px" }}>
                            <div className="d-flex flex-column" >
                                <h4 className="text-secondary" >
                                    Semester
                            </h4>
                                <h4 className="text-dark">
                                    2/2021
                            </h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12 mt-5">
                        <Link href="/file/mda">
                            <a>

                                <div className="bg-mda p-5 mx-auto" style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
                                    <h1 className="text-white font-72px">
                                        MDA
                                </h1>
                                    <h1 className="text-white font-36px">
                                        Media Arts
                                </h1>
                                </div>
                            </a>
                        </Link>

                        <div className="px-3 bg-gray-light py-3 d-flex justify-content-end" style={{ borderBottomLeftRadius: "15px", borderBottomRightRadius: "15px" }}>
                            <div className="d-flex flex-column" >
                                <h4 className="text-secondary" >
                                    Semester
                            </h4>
                                <h4 className="text-dark">
                                    2/2021
                            </h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12 mt-5">
                        <Link href="/file/mmda">
                            <a>
                                <div className="bg-mmda p-5" style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
                                    <h1 className="text-white font-72px">
                                        MMD
                                </h1>
                                    <h1 className="text-white font-36px">
                                        Medical and Science Media
                                </h1>
                                </div>
                            </a>
                        </Link>
                        <div className="px-3 bg-gray-light py-3 d-flex justify-content-end" style={{ borderBottomLeftRadius: "15px", borderBottomRightRadius: "15px" }}>
                            <div className="d-flex flex-column" >
                                <h4 className="text-secondary" >
                                    Semester
                            </h4>
                                <h4 className="text-dark">
                                    2/2021
                            </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default File