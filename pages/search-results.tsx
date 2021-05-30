import { env } from "../config-project.json";
require('isomorphic-fetch');
import MainLayout from "../layouts/MainLayout";
import Head from "next/head";
import { useRouter } from "next/router"
import { Card } from "react-bootstrap";
import ContentWithCategory from "../Components/ContentWithCategory/ContentWithCategory";

const SearchResults = ({data}) => {
    const router = useRouter()
  return (
    <MainLayout>
      <Head>
        <title>
          ผลการค้นหา: {router.query.keyword}
        </title>
      </Head>
            <div className="container-fluid p-5">
                {
                    data.length === 0 &&
                    <div className="d-flex align-items-center flex-column justify-content-center mt-5 h-75">
                        <div className="d-block">
                            <img src="/assets/images/no-content.PNG" alt="not found" className="w-100"/>
                        </div>
                        <h5 className="text-center mt-5 mb-5">
                            ยังไม่พบบทความเกี่ยวกับ {`"${router.query.keyword}"`} ในขณะนี้
                        </h5>
                        <div>
                      </div>
                    </div>
                }
                <ContentWithCategory content={data} />
          </div>
    </MainLayout>

  )
}

SearchResults.getInitialProps = async ({query}) => {
  let url = new URL(env.BASE_API+"blog/search")
  let params = {search: query.keyword}
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  const res = await fetch(url.toString())
  const data = await res.json()
  const jsonData = data
  return {
      data: jsonData
  }
}
export default SearchResults;