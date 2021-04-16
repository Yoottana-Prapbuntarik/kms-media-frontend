import MainLayout from "../layouts/MainLayout";
import Head from "next/head";
import Home from "../Components/Home/HomeContainer";
const Index = () => {
  return (
    <MainLayout>
      <Head>
        <title>
          KMS
        </title>
      </Head>
        <Home />
    </MainLayout>

  )
}

export default Index;