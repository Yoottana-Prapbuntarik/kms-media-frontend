import MainLayout from '../layouts/MainLayout'
import Head from 'next/head'
import WriteBlogContainer from "../Components/WriteBlog/WriteBlogContainer";

const WriteBlog = () => {
    return (
        <MainLayout>
            <Head>
                <title>
                    เขียนบทความ
                </title>
            </Head>
            <WriteBlogContainer />
        </MainLayout>
    )
}

export default WriteBlog