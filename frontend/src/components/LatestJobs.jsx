import { useSelector } from "react-redux";
import { LatestJobsCards } from "./LatestJobsCards";


// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const LatestJobs = () => {
  const{allJobs}=useSelector(store=>store.job);
 
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length<=0 ? <span>No Job available </span> : allJobs?.slice(0,6).map((job) => (
          <LatestJobsCards key={job._id} job={job}>{job}</LatestJobsCards>
        ))}
      </div>
    </div>
  );
};
