import { useRouter } from 'next/router'
import MainLayout from '../../layouts/MainLayout'
import Head from "next/head";

const ChangePassword = () => {
    const router = useRouter();

    return (
        <MainLayout className="min-vh-100">
            <Head>
                <title>
                    {router.query.token}
                </title>
            </Head>
            <div className="container-fluid my-5 p-5">
                <div className="row">
                    <h1 className="mb-5 mx-auto">
                        {router.query.token}
                    </h1>
                </div>
            </div>
        </MainLayout>
    );
};

export default ChangePassword;