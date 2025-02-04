import { Application } from "../models/application.model.js";
import { Job } from "../models/job_model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                SUCCESS: false,
            });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                SUCCESS: false,
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                SUCCESS: false,
            });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            SUCCESS: true,
        });
    } catch (error) {
        console.error("Error in applyJob:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            SUCCESS: false,
        });
    }
};

export const getAppliedJob = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                select: "-__v", // Exclude unnecessary fields
                populate: {
                    path: "company",
                    select: "name location", // Include only necessary fields
                },
            });

        if (applications.length === 0) {
            return res.status(404).json({
                message: "No applications found",
                SUCCESS: false,
            });
        }

        return res.status(200).json({
            applications,
            SUCCESS: true,
        });
    } catch (error) {
        console.error("Error in getAppliedJob:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            SUCCESS: false,
        });
    }
};

export const getApplicant = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "applications",
            populate: {
              path: "applicant",
              select: "fullname email phoneNumber profile.resume profile.resumeOriginalName createdAt",
            },
          });
          

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                SUCCESS: false,
            });
        }

        return res.status(200).json({
            job,
            SUCCESS: true,
        });
    } catch (error) {
        console.error("Error in getApplicant:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            SUCCESS: false,
        });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                SUCCESS: false,
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                SUCCESS: false,
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            SUCCESS: true,
        });
    } catch (error) {
        console.error("Error in updateStatus:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            SUCCESS: false,
        });
    }
};
