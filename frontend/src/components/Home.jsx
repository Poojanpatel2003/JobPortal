import useGetAlljobs from "@/hooks/useGetAllJobs"
import { CategoryCarousel } from "./CategoryCarousel"
import Footer from "./Footer"
import { HeroSection } from "./HeroSection"
import { LatestJobs } from "./LatestJobs"
import Navbar from "./shared/Navbar"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Home=()=>{
    useGetAlljobs();
    const {user} =useSelector(store=>store.auth);
    const navigate=useNavigate();
    useEffect(()=>{
        if(user?.role==='recruiter'){
            navigate("/admin/companies");
        }
    },[]);
    return(
        <>
        <div>
            <Navbar/>
            <HeroSection/>
             <CategoryCarousel/>
             <LatestJobs/> 
             <Footer/>
        </div>
        </>
    )
}