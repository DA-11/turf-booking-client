import { Outlet } from "react-router-dom";
import Header from "../SubComponents/Header";
import Footer from "../SubComponents/Footer";

export default function LayoutPage(){

    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}