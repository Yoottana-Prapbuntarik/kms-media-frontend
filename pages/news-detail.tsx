import { env } from "../config-project.json";
require('isomorphic-fetch');
import MainLayout from "../layouts/MainLayout";
import Head from "next/head";
import NewsDetailComponent from "../Components/NewsDetail/NewsDetail";
const NewsDetail = ({data}) => {
  return (
    <MainLayout>
      <Head>
        <title>
          ข่าวสาร
        </title>
      </Head>
      <NewsDetailComponent content={data}/>
    </MainLayout>

  )
}

NewsDetail.getInitialProps = async ({query}) => {
  const res = await fetch(`${env.BASE_API}news/${query.id}`)
  const data = await res.json()
  const jsonData = data
  return {
      data: jsonData
  }
}
export default NewsDetail;