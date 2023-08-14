<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { EditSectionRequest } from "@/redux-saga/action/sectionAction";


export default function EditSectionPage(props: any) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const section = props.section;

  function handleChange() {
    setModal(!modal);
  }

  useEffect(() => {
    setRefresh(false);
  }, [refresh]);

  const formik = useFormik({
    initialValues: {
      sectTitle: section?.sectTitle,
      sectDescription: section?.sectDescription,
    },
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      const payload = {
        sectId: section.sectId,
        sectProgEntityId: section.sectProgEntityId,
        data: {
          sectTitle: values.sectTitle,
          sectDescription: values.sectDescription,
        },
      };

    //   console.log(`TES DOANGGGGG ${payload}`)
    // section.updateSection(payload);
      dispatch(EditSectionRequest(payload));
      setRefresh(true)
      handleChange();
      props.setAlertInfo({
        showAlert: true,
        alertText: "Data Has Change!",
        alertType: "success",
      });
    },
  });
  return (
    <div>
      <a onClick={handleChange} className="btn btn-primary btn-sm mx-1">
        Edit
      </a>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Section</h3>
          <div className="border-t border-gray-300 my-3"></div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col mb-3">
                <label htmlFor="progEntityId" className="my-2 mr-5">
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
                <label htmlFor="progEntityId" className="my-2 mr-5">
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
              <div className="modal-action">
                <button type="button" className="btn" onClick={handleChange}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
=======
import { UpdateSectionRequest } from "@/redux-saga/action/sectionAction";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function EditSectionPage(props: any) {
    const dispatch = useDispatch();
    const [view, setview] = useState(true);

    function handleChange() {
        setview(!view);
        props.setview(false)
    }

    const section = props.section
    const progEntityId = props.progEntityId
    
    const formik = useFormik({
        initialValues: {
            sectId: section.sectId,
            sectTitle: section.sectTitle,
            sectDescription: section.sectDescription,
        },
        enableReinitialize: true,
        onSubmit: async (values: any) => {
            const data = {
              sectId: section.sectId,
              progEntityId: progEntityId,
              data: {
                sectTitle: values.sectTitle,
                sectDescription: values.sectDescription,
              }
            }

            // console.log(`Payload: ${JSON.stringify(data)}, progEntityId: ${props.progEntityId}`);
            

            dispatch(UpdateSectionRequest(data));
            props.setRefreshView(true);
            props.setRefreshEdit(true);
            handleChange();
            props.setAlertInfo({ showAlert: true, alertText: 'Successfully Update Data!', alertType: 'success'});
        },
    });

    return (
        <div className="">
            <h3 className="font-bold text-lg">
                Section (#{section.sectId})
            </h3>
            <div className="border-t border-gray-300 my-3"></div>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="sectTitle" className="my-2 mr-5">Section Name</label>
                        <input type="text" id="sectTitle" placeholder="section name" defaultValue={formik.values.sectTitle} onChange={formik.handleChange} className="input input-bordered w-full text-base"/>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="sectDescription" className="my-2 mr-5">Section Description</label>
                        <textarea id="sectDescription" placeholder="section description" defaultValue={formik.values.sectDescription} onChange={formik.handleChange} className="textarea textarea-bordered h-24 w-full text-base"/>
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>
                        Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                        Submit
                        </button>
                    </div>
                </form> 
            </div>
>>>>>>> 83cd4321747a6df064a464fc4a892b8a3e8af8dc
        </div>
      </div>
    </div>
  );
}
