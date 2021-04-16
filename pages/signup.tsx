import MainLayout from '../layouts/MainLayout'
import Head from 'next/head'
import SignupComponentContainer from "../Components/Signup/SignupComponentContainer";

const signup = () => {
    return (
        <MainLayout>
            <Head>
                <title>
                    สมัครสมาชิก
                </title>
            </Head>
            <SignupComponentContainer />
        </MainLayout>
    )
}

export default signup