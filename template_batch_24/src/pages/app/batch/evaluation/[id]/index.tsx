import Page from "@/pages/component/commons/Page";
import AppLayout from "@/pages/component/layout/AppLayout";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState } from "react";

const dummy_student_evaluation = [
    {
        type: 'Technical',
        skills: [
            {
                skill: 'Fundamental',
                grade: 4,
            },
            {
                skill: 'OOP',
                grade: 4,
            },
            {
                skill: 'Database',
                grade: 4,
            },
        ]
    },
    {
        type: 'Soft Skill',
        skills: [
            {
                skill: 'Communication',
                grade: 4,
            },
            {
                skill: 'Teamwork',
                grade: 3,
            },
            {
                skill: 'Self-Learning',
                grade: 4,
            },
        ]
    },
]

export default function BatchStudentEvaluation() {
  const router = useRouter();
  const [studentEv, setStudentEv] = useState(dummy_student_evaluation);

  const handleStudentEvChange = (e: any, indexType: number, indexSkill: number) => {
    const list = [...studentEv];
    list[indexType]['skills'][indexSkill]['grade'] = e.target.valueAsNumber;
    setStudentEv(list);
  }

  const onSave = () => {
    console.log(studentEv);
  }

  return (
    <AppLayout>
      <Page title="Batch#20 Bootcamp" titleButton="Back" titleButton2="Save" onClick={() => router.back()} onClick2={onSave}>
        <div className="border border-slate-400 p-3 rounded-lg">
            <div className="grid grid-cols-3 items-center">
                <div className="flex">
                    <img className="w-24 h-24 rounded-full mr-3" src="/assets/images/candidate.png" alt="User image"/>
                    <div>
                        <h1 className="text-lg">Sanita Tia</h1>
                        <h1 className="text-sm">NodeJS, Batch#20, Running</h1>
                        <h1 className="text-sm">24 May 2023 until 24 August 2023</h1>
                    </div>
                </div>
                <div className="justify-self-center">
                    <h1 className="text-base">Universitas A</h1>
                    <h1 className="text-base">Jurusan Informatika</h1>
                    <h1 className="text-base">IPK 3.45</h1>
                </div>
                <h1 className="justify-self-center text-lg font-medium">Score 90</h1>
            </div>
        </div>
        {studentEv.map((ev, ti) => 
            <Disclosure as='div' key={ti} className={`${ti == 0 && 'mt-3'}`}>
            {({ open }) => (
                <>
                <Disclosure.Button className={`flex items-center justify-between w-full p-3 font-medium text-left text-gray-600 border border-gray-400 focus:ring-4 focus:ring-gray-200 ${ti == 0 && 'rounded-t-xl border-b-0'} ${ti == dummy_student_evaluation.length - 1 && !open && 'rounded-b-xl'}`}>
                    <span>{ev.type} Scale (1-4)</span>
                    <ChevronUpIcon
                    className={`${
                        open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-500`}
                    />
                </Disclosure.Button>
                <Disclosure.Panel className={`p-5 border border-gray-400 space-y-3 ${ti != 0 && 'border-t-0 rounded-b-xl'} ${ti != dummy_student_evaluation.length - 1 && 'border-b-0'}`}>
                    {ev.skills.map((s, si) => 
                        <div key={si} className="grid grid-cols-3 items-center gap-2">
                            <span>{s.skill}</span>
                            <input type="number" name={`${s.skill.toLocaleLowerCase()}`} min={1} max={4} value={s.grade} onChange={(e) => handleStudentEvChange(e, ti, si)} className="block p-2 text-lg w-16 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                    )}
                </Disclosure.Panel>
                </>
            )}
            </Disclosure>
        )}
      </Page>
    </AppLayout>
  );
}
