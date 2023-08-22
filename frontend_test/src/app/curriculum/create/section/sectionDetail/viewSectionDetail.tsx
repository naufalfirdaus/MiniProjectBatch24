import { AddSectionRequest } from "@/redux-saga/action/sectionAction";
import { DeleteOneSectionDetailRequest } from "@/redux-saga/action/sectionDetailAction";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import config from "@/config/config";
import EditSectionDetailPage from "./editSectionDetail";

export default function ViewSectionDetailPage(props: any) {
    const dispatch = useDispatch();
    const [imageExists, setImageExists] = useState(true);

    const [editView, setEditView] = useState(false);

    function handleChange() {
        setEditView(false);
        props.setView()
    }

    const section = props.section;

    const handleImageError = () => {
        setImageExists(false);
    };
    
    const onDelete = () => {
        dispatch(DeleteOneSectionDetailRequest(section.secdId));
        props.setView();
        props.alert({ showAlert: true, alertText: 'Waiting...', alertType: 'success'});
        // props.setRefresh(true);
    }

    return (
        <>
            {editView ? (<>
                <EditSectionDetailPage data={section} setView = {handleChange} setRefresh={props.setRefresh} props={props.alert}/>
            </>)
            :(<>    
                <>
                    <div className="flex justify-between">
                        <h3 className="font-bold text-lg">
                            Create Section Detail
                        </h3>
                    </div>
                    <div className="border-t border-gray-300 my-3"></div>
                    <div className="grid grid-cols-2 gap-x-5">
                        <div className="col-span-1">
                            {section.sectionDetailMaterials.length !== 0 ? (
                                section.sectionDetailMaterials[0].sedmFiletype === 'image' ? (<>
                                    <div className="avatar mb-3">
                                        <div className="w-24 m-auto">
                                            {section?.sectionDetailMaterials[0].sedmFilename === null || section?.sectionDetailMaterials[0].sedmFilename === '' ? (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>) : imageExists ? (<Image src={`${config.domain}/program_entity/subsection/get/file/${section?.sectionDetailMaterials[0].sedmFilename}`} alt={"dss"} layout="fill" objectFit="contain" onError={handleImageError}/>) : (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>)}
                                        </div>
                                    </div>
                                </>) : section.sectionDetailMaterials[0].sedmFiletype === 'video' ? 
                                (<>
                                    <video controls>
                                        <source src={`${config.domain}/program_entity/subsection/get/file/${section?.sectionDetailMaterials[0].sedmFilename}`}/>
                                    </video>
                                </>) : (<></>)
                            ) : (<></>)}
                        </div>
                        <div className="col-span-1 p-5 flex flex-col justify-center gap-5">
                            <div>
                                <div className="text-xl text-zinc-400 font-semibold uppercase">Title</div>
                                <div className="text-xl capitalize font-medium">{section.secdTitle}</div>
                            </div>
                            <div>
                                <div className="text-xl text-zinc-400 font-semibold uppercase">Description</div>
                                <div className="text-lg capitalize font-medium">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita quasi obcaecati aut consectetur earum ut minima nesciunt, corporis recusandae! Eligendi doloremque repellat excepturi totam facere ut iusto tempore nobis doloribus.</div>
                            </div>
                        </div>
                    </div>
                        {props.view ? (<></>):(
                        <div className="modal-action flex justify-between">
                            <button type="button" className="btn btn-outline btn-error btn-sm" onClick={onDelete}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                <span>Delete</span>
                            </button>
                            <div className="flex gap-3">
                                <button type="button" className="btn btn-sm btn-primary" onClick={()=>{setEditView(true)}}>
                                Edit
                                </button>
                                <button type="button" className="btn btn-sm btn-neutral" onClick={handleChange}>
                                Close
                                </button>
                            </div>
                        </div>
                        )}
                </>
            </>)}
        </>
    )
}
