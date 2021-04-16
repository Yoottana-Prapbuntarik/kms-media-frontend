import MainLayout from '../layouts/MainLayout'
import Head from 'next/head'
import SigninComponentContainer from "../Components/Signin/SigninComponentContainer";

const signin = () => {
    return (
        <MainLayout>
            <Head>
                <title>
                    เข้าสู่ระบบ
                </title>
            </Head>
            <SigninComponentContainer />
        </MainLayout>
    )
}

export default signin