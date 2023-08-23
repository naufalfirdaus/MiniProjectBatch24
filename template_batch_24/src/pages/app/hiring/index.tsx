import React, { useEffect } from "react";

import AppLayout from "../../component/layout/AppLayout";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { GetJobReq } from "@/redux-saga/action/JobAction";
import { useRouter } from "next/router";

export default function Hiring() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { jobs } = useSelector((state: any) => state.jobState);

  useEffect(() => {
    dispatch(GetJobReq());
  }, [dispatch]);

  return (
    <AppLayout>
      <div className="text-black">Hiring</div>
      <Link href={`hiring/post/create`} className="text-black">
        Create Post
      </Link>
      {jobs &&
        jobs.map((job: any) => {
          return (
            <div key={job.jopoEntityId} className="text-black">
              <span>{job.jopoEntityId}</span>{" "}
              <Link
                href={`hiring/post/${job.jopoEntityId}`}
                className="text-black"
              >
                Update Post
              </Link>
            </div>
          );
        })}
    </AppLayout>
  );
}
