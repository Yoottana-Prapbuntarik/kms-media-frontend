import { env } from "../config-project.json";
require('isomorphic-fetch');
import MainLayout from "../layouts/MainLayout";
import Head from "next/head";
import News from "../Components/News/News";
const New = ({data}) => {
  return (
    <MainLayout>
      <Head>
        <title>
          ข่าวสาร
        </title>
      </Head>
      <News content={data.news}/>
    </MainLayout>

  )
}

New.getInitialProps = async () => {
  const res = await fetch(`${env.BASE_API}news`)
  const data = await res.json()
  const jsonData = data
  return {
      data: jsonData
  }
}
export default New;