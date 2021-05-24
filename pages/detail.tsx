import MainLayout from '../layouts/MainLayout'
import Head from 'next/head'
import DetailComponent from "../Components/DetailCompoent/DetailCompoentContainer";
import { getArticleDetail  } from "../apis/getAllArticle";

import { useRouter } from "next/router";
const Detail = () => {
    const router = useRouter()
    return (
        <MainLayout>
            <Head>
                <title>
                    รายละเอียดบทความ
                </title>
            </Head>
            <DetailComponent detail={router.query.content}/>
        </MainLayout>
    )
}

Detail.getInitialProps =  () => {
    getArticleDetail()
}

export default Detail

