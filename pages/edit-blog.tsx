import MainLayout from '../layouts/MainLayout'
import Head from 'next/head'
import EditBlogContainer from "../Components/EditBlog/EditBlogContainer";

const EditBlog = () => {
    return (
        <MainLayout>
            <Head>
                <title>
                    แก้ไขบทความ
                </title>
            </Head>
            <EditBlogContainer />
        </MainLayout>
    )
}

export default EditBlog