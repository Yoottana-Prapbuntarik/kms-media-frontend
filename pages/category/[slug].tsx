import { useRouter } from 'next/router'
import MainLayout from '../../layouts/MainLayout'
import Head from "next/head";
import CategoryComponent from "../../Components/CategoryComponent/CategoryComponentContainer";
const productType = () => {
    const router = useRouter();

    return (
        <MainLayout className="min-vh-100">
            <Head>
                <title>
                    {router.query.slug}
                </title>
            </Head>
            <div className="container-fluid my-5 p-5">
                <div className="row">
                    <h1 className="mb-5 mx-auto">
                        {router.query.slug}
                    </h1>
                </div>
                    <CategoryComponent />
            </div>
        </MainLayout>
    );
};

export default productType;