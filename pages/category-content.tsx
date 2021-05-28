import MainLayout from '../layouts/MainLayout'
require('isomorphic-fetch');
import { env } from "../config-project.json";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router"
import ContentWithCategory from "../Components/ContentWithCategory/ContentWithCategory";
const CategoryContent = ({ data }) => {
    const router = useRouter()
    return (
        <MainLayout className="min-vh-100">
            <Head>
                <title>
                    บทความ | {router.query.name}
                </title>
            </Head>
            <div className="container-fluid p-5">
                <h1 className="text-center mt-3 mb-3">
                    {data.length !== 0 ? `บทความ |  ${data[0].category.name}` : `บทความ | ${router.query.name}`}
                </h1>
                {
                    data.length === 0 &&
                    <div className="d-flex align-items-center flex-column justify-content-center mt-5 h-75">
                        <div className="d-block">
                            <img src="/assets/images/no-content.PNG" alt="not found" className="w-100"/>
                        </div>
                        <h5 className="text-center mt-5 mb-5">
                            ยังไม่พบบทความในขณะนี้
                        </h5>
                        <div>
                            <Link href="/category">
                                <a className="text-dark text-center mt-5">
                                    เลือกบทหมวดหมู่อื่น ๆ
                        </a>
                            </Link>
                        </div>
                    </div>
                }
                <ContentWithCategory content={data} />
            </div>
        </MainLayout>
    );
};

CategoryContent.getInitialProps = async ({ query }) => {
    const res = await fetch(`${env.BASE_API}blog/content/category/${query.id}`)
    const data = await res.json()
    const jsonData = data
    return {
        data: jsonData
    }
}
export default CategoryContent;