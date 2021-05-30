import MainLayout from '../layouts/MainLayout'
require('isomorphic-fetch');
import { env } from "../config-project.json";
import Head from "next/head";
import CategoryComponent from "../Components/CategoryComponent/CategoryComponentContainer";
const CategoryType = ({data}) => {
    return (
        <MainLayout className="min-vh-100">
            <Head>
                <title>
                    Category
                </title>
            </Head>
            <div className="container-fluid p-5">
                <h1 className="text-center mt-3 mb-3">Category</h1>
                <CategoryComponent categoryItem={data}/>
            </div>
        </MainLayout>
    );
};

CategoryType.getInitialProps = async () => {
    const res = await fetch(`${env.BASE_API}blog/category`)
    const data = await res.json()
    const jsonData = data
    return {
        data: jsonData
    }
  }
export default CategoryType;