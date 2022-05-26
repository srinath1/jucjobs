import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import moment from "moment";
import { applyJob } from "../redux/actions/jobActions";
import { Tag, Divider } from 'antd';

const JobInfo = () => {
  const { jobs } = useSelector((state) => state.jobsReducer);
  let { id } = useParams();
  console.log("Params=>", id);
  const job = jobs.find((job) => job._id === id);
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const appliedCandidates=job.appliedCandidates;
  const alreadyApplied=appliedCandidates.find(c=>c.userid===userId)
  const dispatch=useDispatch()
  const applyNow=()=>{
    dispatch(applyJob(job))
  }

  return (
    <div>
      <DefaultLayout>
        <div>
          <p>
            <b>Title</b> : {job.title}
          </p>
          <p>
            <b>Company</b> : {job.company}
          </p>

          <p>
            <b>Small Description</b> : {job.smallDescription}
          </p>
          <p>
            <b>Full Description</b> : {job.fullDescription}
          </p>
          <p>
            <b>Title</b> : {job.title}
          </p>
          <p>
            <b>Skills Required</b> : {job.skillsRequired}
          </p>
          <p>
            <b>Experience</b> : {job.experience}
          </p>
          <p>
            <b>Minimum Qualification</b> : {job.minimumQualification}
          </p>

          <hr />

          <p>
            <b>Salary Range</b> : {job.salaryFrom} - {job.salaryTo}
          </p>
          <p>
            <b>Department</b> : {job.department}
          </p>
          <p>
            <b>Company Profile</b> : {job.companyDescription}
          </p>
          <p>
            <b>Total Candidates applied</b> : {job.appliedCandidates.length}
          </p>

          <hr />
          <div className="flex justify-content-between">
            {job.postedBy === userId ? (
              <Button>
                <Link to={`/editjob/${job._id}`}>Edit Now</Link>
              </Button>
            ) : alreadyApplied ? (<Tag color="green">Already Applied</Tag>):(
              <Button onClick={applyNow}>Apply Now</Button>
            )}
            <b>Posted on</b> {moment(job.createdAt).format("MMM DD yyyy")}
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default JobInfo;
