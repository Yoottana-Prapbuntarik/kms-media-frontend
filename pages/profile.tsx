import MainLayout from '../layouts/MainLayout'
import Head from 'next/head'
import Profile from "../Components/Profile/ProfileContainer";
import { useRouter } from "next/router";
const profile = () => {
    const router = useRouter()
    return (
        <MainLayout>
            <Head>
                <title>
                    โปรไฟล์ของฉัน
                </title>
            </Head>
            <Profile  
            firstName={router.query.firstName} 
            lastName={router.query.lastName} 
            uuid={router.query.uuid}/>
        </MainLayout>
    )
}

export default profile