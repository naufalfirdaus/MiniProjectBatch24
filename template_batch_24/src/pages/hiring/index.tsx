import { useDispatch, useSelector } from "react-redux";
import LandingPage from "../component/layout/LandingPage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetJobReq } from "@/redux-saga/action/JobAction";

export default function Hiring() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { jobs } = useSelector((state: any) => state.jobState);

  useEffect(() => {
    dispatch(GetJobReq());
  }, [dispatch]);

  return (
    <div>
      <LandingPage>
        <h1 className="text-black">Hiring</h1>
        {jobs &&
        jobs.map((job: any) => {
          return (
            <div key={job.jopoEntityId} className="text-black">
              <span>{job.jopoEntityId}</span>{" "}
              <button onClick={() => {
                sessionStorage.setItem("jopoEntityId", job.jopoEntityId);
                router.push({
                 pathname: "hiring/apply" ,
                 query: {
                  jopoEntityId: job.jopoEntityId
                 }
                }, "hiring/apply")
              }}>apply</button>
            </div>
          );
        })}
      </LandingPage>
    </div>
  )
}
