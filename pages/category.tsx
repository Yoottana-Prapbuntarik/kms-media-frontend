import MainLayout from '../layouts/MainLayout'
import Head from "next/head";
import CategoryComponent from "../Components/CategoryComponent/CategoryComponentContainer";
const CategoryType = () => {
    return (
        <MainLayout className="min-vh-100">
            <Head>
                <title>
                    Category
                </title>
            </Head>
            <div className="container-fluid p-5">
                <h1 className="text-center mt-3 mb-3">Category</h1>
                <CategoryComponent />
            </div>
        </MainLayout>
    );
};

export default CategoryType;