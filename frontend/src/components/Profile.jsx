import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAllAppliedJob from "@/hooks/useGetAllAppliedJob";

// const skills = ["HTML", "css", "Javascript", "ReactJs"];
const isResume = true;
const Profile = () => {
  useGetAllAppliedJob();
  const [open,setOpen]=useState(false);
  const {user}=useSelector(store=>store.auth);

 
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-2 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-2 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
  <h1>Skills</h1>
  <div className="flex flex-wrap gap-2">
    {user?.profile?.skills.length > 0 ? (
      user.profile.skills.map((item, index) => (
        <Badge key={index} className='py-1 px-2'>
          {item}
        </Badge>
      ))
    ) : (
      <span>N/A</span>
    )}
  </div>
</div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {
          isResume ? (
            <a
              target="blank"
              href={user?.profile.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
              rel="noopener noreferrer"
            >
              {user?.profile.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}

        </div>
      </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
          <h1 className='font-bold text-lg my-5'>Applied Job</h1>
          <AppliedJobTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
