import MainLayout from "../layouts/MainLayout";
require('isomorphic-fetch');
import { env } from "../config-project.json";
import Head from "next/head";
import Home from "../Components/Home/HomeContainer";
const Index = ({data}) => {
  return (
    <MainLayout>
      <Head>
        <title>
          KMS
        </title>
      </Head>
        <Home sliderData={data.news}/>
    </MainLayout>

  )
}
Index.getInitialProps = async () => {
  const res = await fetch(`${env.BASE_API}news`)
  const data = await res.json()
  const jsonData = data
  return {
      data: jsonData
  }
}
export default Index;