import { getServerSession } from "next-auth"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import UserPosts from "./UserPosts"

export default async function Dash(){
    const sesh = await getServerSession(authOptions)
    if(!sesh){
        redirect("/api/auth/signin")
    }
    
    return (
        // <body className={`mx-4 md:mx-48 xl:mx-96$ bg-gray-200 dark:bg-black`}>
        <main >
            <h1 className= "text-2xl font-bold">Welecome {sesh?.user?.name}!</h1>
            <UserPosts/>
        </main>
    )
}