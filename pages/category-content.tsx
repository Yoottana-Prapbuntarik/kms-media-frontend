import MainLayout from '../layouts/MainLayout'
require('isomorphic-fetch');
import { env } from "../config-project.json";
import Head from "next/head";
import ContentWithCategory from "../Components/ContentWithCategory/ContentWithCategory";
const CategoryContent = ({data}) => {
    return (
        <MainLayout className="min-vh-100">
            <Head>
                <title>
                    บทความ | {data.length !== 0 ? data[0].category.name : "ยังไม่พบบทความ"}
                </title>
            </Head>
            <div className="container-fluid p-5">
                <h1 className="text-center mt-3 mb-3">
                {data.length !== 0 ? `บทความ |  ${data[0].category.name}` : "ยังไม่พบบทความ"}
                </h1>
                <ContentWithCategory content={data}/>
            </div>
        </MainLayout>
    );
};

CategoryContent.getInitialProps = async ({query}) => {
    console.log(query.id)
    const res = await fetch(`${env.BASE_API}blog/content/category/${query.id}`)
    const data = await res.json()
    const jsonData = data
    return {
        data: jsonData
    }
}
export default CategoryContent;