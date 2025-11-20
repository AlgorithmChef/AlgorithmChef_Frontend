import { Outlet } from "react-router-dom";
import Header from "./Header";
function RootLayout(){
    return(
        <div className="min-h-screen bg-white">
            <Header />
            <main className="mt-4">
                <Outlet />
            </main>
        </div>
    )
}

export default RootLayout;