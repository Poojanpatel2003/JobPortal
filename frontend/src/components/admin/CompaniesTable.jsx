import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies,searchCompanyByText } = useSelector((store) => store.company) || {}; // Default to empty object if undefined
  const [filterCompany,setFilterCompany]=useState(companies);
  const navigate=useNavigate();
  useEffect(()=>{
    const filteredCompany=companies.length>=0 && companies.filter((company)=>{
      if(!searchCompanyByText){
        return true
      };
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())

    });
    setFilterCompany(filteredCompany);
  },[companies,searchCompanyByText])
  return (
    <div>
      <Table>
        <TableCaption>A List of Your Recent Registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!filterCompany || filterCompany.length === 0 ? ( // Check if companies is undefined or empty
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                You don&apos;t have any companies
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo || "default-logo-url"} alt="Company Logo" />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>{
                        navigate(`/admin/companies/${company._id}`)
                      }} className="flex items-center gap-3 mx-6 w-fit my-3 bg-gray-200 p-2 cursor-pointer rounded-lg">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
