import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@radix-ui/react-popover";
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
  import { MoreHorizontal } from "lucide-react";
  import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
  
  const shortListingStatus = ["Accepted", "Rejected"];
  
  const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);
    const statusHandler=async(status,id)=>{
        try {
            axios.defaults.withCredentials=true;
            const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true});
            if(res.data.SUCCESS){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
      <div>
        <Table>
          <TableCaption>A list of your recent applied users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {(applicants?.applications?.length ?? 0) > 0 ? (
    applicants.applications.map((application) => (
        <TableRow key={application._id}>
            <TableCell>{application?.applicant?.fullname || "N/A"}</TableCell>
            <TableCell>{application?.applicant?.email || "N/A"}</TableCell>
            <TableCell>{application?.applicant?.phoneNumber || "N/A"}</TableCell>
            <TableCell className="text-blue-600 cursor-pointer">
                {application?.applicant?.profile?.resume ? (
                    <a href={application.applicant.profile.resume} target="_blank" rel="noopener noreferrer">
                        {application.applicant.profile.resumeOriginalName || "Resume"}
                    </a>
                ) : "No Resume"}
            </TableCell>
            <TableCell>{new Date(application?.createdAt).toLocaleDateString() || "N/A"}</TableCell>
            <TableCell className="float-right cursor-pointer">
                <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className="w-32">
                        {shortListingStatus.map((status, index) => (
                            <div key={index} className="flex w-fit items-center my-2 mx-8 cursor-pointer"
                                onClick={() => statusHandler(status, application?._id)}>
                                <span>{status}</span>
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
            </TableCell>
        </TableRow>
    ))
) : (
    <TableRow>
        <TableCell colSpan={6}>No applications found.</TableCell>
    </TableRow>
)}

          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default ApplicantsTable;
  