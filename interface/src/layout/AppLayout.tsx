import { Outlet } from "react-router";
import Footer from "./Footer"
import Header from "./Header"


const AppLayout = () => {

    return(
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow py-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default AppLayout;