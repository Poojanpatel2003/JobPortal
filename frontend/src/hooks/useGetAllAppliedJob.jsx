import { setAllAppliedJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAppliedJob=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchAppliedJob=async()=>{
            try {
                const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.SUCCESS){
                    dispatch(setAllAppliedJob(res.data.applications))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAppliedJob();
    },[])
}
export default useGetAllAppliedJob;