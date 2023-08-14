import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { EditSectionRequest } from "@/redux-saga/action/sectionAction";


export default function EditSectionPage(props: any) {
  const dispatch = useDispatch();
  const [view, setview] = useState(true);
  const section = props.section;

  function handleChange() {
    setview(!view);
    props.setview(false)
  }

  const formik = useFormik({
    initialValues: {
      sectTitle: section?.sectTitle,
      sectDescription: section?.sectDescription,
      sectTotalSection: section?.sectTotalSection,
      sectTotalLecture: section?.sectTotalLecture,
      sectTotalMinute: section?.sectTotalMinute,
    },
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      const payload = {
        sectId: section.sectId,
        sectProgEntityId: section.sectProgEntityId,
        data: {
          sectTitle: values.sectTitle,
          sectDescription: values.sectDescription,
          sectTotalSection: values.sectTotalSection,
          sectTotalLecture: values.sectTotalLecture,
          sectTotalMinute: values.sectTotalMinute,
        },
      };

    //   console.log(`TES DOANGGGGG ${payload}`)
    // section.updateSection(payload);
      dispatch(EditSectionRequest(payload));
      props.setRefreshView(true);
      props.setRefreshEdit(true);
      handleChange();
      props.setAlertInfo({ showAlert: true, alertText: 'Data Successfully Added!', alertType: 'success'});
    },
  });
  return (
    <div className="">
            <h3 className="font-bold text-lg">
            Edit Section
            </h3>
            <div className="border-t border-gray-300 my-3"></div>
            <div>
            <form>
              <div className="flex flex-col mb-3">
                <label htmlFor="sectTitle" className="my-2 mr-5">
                  Section Name
                </label>
                <input
                  type="text"
                  id="sectTitle"
                  placeholder="section name"
                  defaultValue={section?.sectTitle}
                  onChange={formik.handleChange}
                  className="input input-bordered w-full text-base"
                />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="sectDescription" className="my-2 mr-5">
                  Section Description
                </label>
                <textarea
                  id="sectDescription"
                  placeholder="section description"
                  defaultValue={section?.sectDescription}
                  onChange={formik.handleChange}
                  className="textarea textarea-bordered h-24 w-full text-base"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col mb-3">
                <label htmlFor="sectTotalSection" className="my-2 mr-5">Total Section</label>
                <input type="number" id="sectTotalSection" className="input input-bordered text-sm capitalize" defaultValue={section?.sectTotalSection} onChange={formik.handleChange}/>
                </div>
                <div className="flex flex-col mb-3">
                <label htmlFor="sectTotalLecture" className="my-2 mr-5">Total Lecture</label>
                <input type="number" id="sectTotalLecture" className="input input-bordered text-sm capitalize" defaultValue={section?.sectTotalLecture} onChange={formik.handleChange}/>
                </div>
                <div className="flex flex-col mb-3">
                <label htmlFor="sectTotalMinute" className="my-2 mr-5">Total Minute</label>
                <input type="number" id="sectTotalMinute" className="input input-bordered text-sm capitalize" defaultValue={section?.sectTotalMinute} onChange={formik.handleChange}/>
                </div>
            </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={handleChange}>
                  Close
                </button>
                <button type="button" onClick={() => formik.handleSubmit()} className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
            </div>
        </div>
  );
}
