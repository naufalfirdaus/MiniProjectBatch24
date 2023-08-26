import Page from "@/pages/component/commons/Page";
import AppLayout from "@/pages/component/layout/AppLayout";
import { getBatchTraineeEvaluationFetch, updateTraineeEvalutaionScoreTry } from "@/redux-saga/slices/batchSlices";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "core-js";
import Image from "next/image";

export default function BatchStudentEvaluation() {
  const router = useRouter();
  const [studentEv, setStudentEv] = useState<any>({});
  const traineeEv = useSelector((state: any) => state.batchs.traineeEvaluation);
  const status = useSelector((state: any) => state.batchs.status);
  const dispatch = useDispatch();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  useEffect(() => {
    if(router.query.id){
        dispatch(getBatchTraineeEvaluationFetch(router.query.id));
    }
    groupDataByType();
  }, [router, Object.keys(traineeEv).length]);

  const handleStudentEvChange = (e: any, type: string, indexSkill: number) => {
    const list = {...studentEv};
    const skor = {...list[type][indexSkill]};
    skor['btevSkor'] = e.target.valueAsNumber;
    list[type][indexSkill] = skor;
    setStudentEv(list);
  }

  const groupDataByType = () => {
    const traineeEvGroup = Object.keys(traineeEv).length != 0 && traineeEv.traineeEvaluation.group((trainee: any) => {
        return trainee.btevType;
    });
    setStudentEv(traineeEvGroup);
  }

  const handleBackButton = () => {
    router.push({pathname: `/app/batch/evaluation`, query: {batchid: traineeEv.trainee.batrBatch.batchId}});
  }
  
  const onSave = () => {
    const traineeData = {
        userId: router.query.id,
        data: studentEv,
    }
    dispatch(updateTraineeEvalutaionScoreTry(traineeData));
  }

  return (
    <AppLayout>
        {Object.keys(traineeEv).length != 0 && 
            <Page title={`${traineeEv.trainee.batrBatch.batchName} ${traineeEv.trainee.batrBatch.batchEntity.progTitle} Evaluation`} titleButton="Back" titleButton2="Save" onClick={() => handleBackButton()} onClick2={() => onSave()}>
                <div className="border border-slate-400 p-3 rounded-lg">
                    <div className="grid grid-cols-5 items-center">
                        <div className="flex col-span-2">
                            <Image height={60} width={60} priority className="w-20 h-20 rounded-full mr-3" src="/assets/images/candidate.png" alt="User image"/>
                            <div>
                                <h1 className="text-lg font-medium">{traineeEv.user.userFirstName} {traineeEv.user.userLastName}</h1>
                                <h1 className="text-sm">{traineeEv.trainee.batrBatch.batchEntity.progTitle}, {traineeEv.trainee.batrBatch.batchName}, {traineeEv.trainee.batrStatus}</h1>
                                <h1 className="text-sm">{new Date(traineeEv.trainee.batrBatch.batchStartDate).toLocaleDateString('id-ID', options as any)} sampai {new Date(traineeEv.trainee.batrBatch.batchEndDate).toLocaleDateString('id-ID', options as any)}</h1>
                            </div>
                        </div>
                        <div className="justify-self-center col-span-2">
                            <h1 className="text-base">{traineeEv.user.usersEducations[0].usduSchool}</h1>
                            <h1 className="text-base">{traineeEv.user.usersEducations[0].usduFieldStudy}</h1>
                            <h1 className="text-base">{traineeEv.user.usersEducations[0].usduGrade}</h1>
                        </div>
                        <h1 className="justify-self-center text-xl font-medium">Score {traineeEv.trainee.batrTotalScore}</h1>
                    </div>
                </div>
                {Object.keys(studentEv).map((key: any, ti: any) => 
                    <Disclosure as='div' key={ti} className={`${ti == 0 && 'mt-3'}`}>
                    {({ open }) => (
                        <>
                        <Disclosure.Button className={`flex items-center justify-between w-full p-3 font-medium text-left text-gray-600 border border-gray-400 focus:ring-4 focus:ring-gray-200 ${ti == 0 && 'rounded-t-xl border-b-0'} ${ti == Object.keys(studentEv).length - 1 && !open && 'rounded-b-xl'}`}>
                            <span>{key} Scale (1-4)</span>
                            <ChevronUpIcon
                            className={`${
                                open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className={`p-5 border border-gray-400 space-y-3 ${ti != 0 && 'border-t-0 rounded-b-xl'} ${ti != Object.keys(studentEv).length - 1 && 'border-b-0'}`}>
                            {studentEv[key].map((s: any, si: number) => 
                                <div key={si} className="grid grid-cols-3 items-center gap-2">
                                    <span>{s.btevSkill}</span>
                                    <input type="number" name={`${s.btevSkill.toLocaleLowerCase()}`} min={1} max={4} value={s.btevSkor} onChange={(e) => handleStudentEvChange(e, key, si)} className="block p-2 text-lg w-16 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"/>
                                </div>
                            )}
                        </Disclosure.Panel>
                        </>
                    )}
                    </Disclosure>
                )}
            </Page>
        }
    </AppLayout>
  );
}
