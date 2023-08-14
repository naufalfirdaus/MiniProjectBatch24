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
            <form>
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
                <button type="button" onClick={() => formik.handleSubmit()} className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
