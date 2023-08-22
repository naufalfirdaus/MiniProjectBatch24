const CardAddEducation = () => {
    return (
      <>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Add Education</h2>
        <div className='w-full bg-white p-3 rounded-md mt-3 mb-3'>
          <form>
            <div className="border-b border-gray-900/10 pb-12">
             {/* SCHOOL */}
              <div className="sm:col-span-4">
                  <div className="flex items-center">
                  <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900 w-24">
                  School
                  </label>
                  <div className="mt-2 flex-1">
                    <input
                      id="postal-code"
                      name="postal-code"
                      type="text"
                      autoComplete="postal-code"
                      className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  </div>
              </div>

              {/* DEGREE*/}
              <div className="sm:col-span-3 mt-3">
                <div className="flex items-center">
                <label htmlFor="address-type" className="block text-sm font-medium leading-6 text-gray-900 w-24">
                    Degree
                  </label>
                <div className="mt-1">
                <select
                id="address-type"
                name="address-type"
                autoComplete="address-type"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"                placeholder="Code Telp."
              >
                <option value="bachelor">Bachelor</option>
                <option value="diploma">Diploma</option>
                <option value="phd">PHD</option>
                <option value="high_school">High School</option>
              </select>
                </div>
                </div>
              </div>

            {/* FIELD STUDY*/}
              <div className="sm:col-span-4 mt-3">
                  <div className="flex items-center">
                  <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900 w-24">
                  Field Study
                  </label>
                  <div className="mt-1 flex-1">
                    <input
                      id="postal-code"
                      name="postal-code"
                      type="text"
                      autoComplete="postal-code"
                      className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  </div>
              </div>

              {/* GRADE*/}
              <div className="sm:col-span-4 mt-3">
                  <div className="flex items-center">
                  <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900 w-24">
                  Grade
                  </label>
                  <div className="mt-1">
                    <input
                      id="postal-code"
                      name="postal-code"
                      type="text"
                      autoComplete="postal-code"
                      className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  </div>
              </div>

              {/* START AND END STUDY */}
            <div className="sm:col-span-4 mt-3 flex items-center">
            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900 w-24">
                Start
            </label>
            <div className="mt-1">
                <input
                id="postal-code"
                name="postal-code"
                type="date"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            <label htmlFor="postal-code" className="block ml-3 text-sm font-medium leading-6 text-gray-900 w-11">
                Until
            </label>
            <div className="mt-1">
                <input
                id="postal-code"
                name="postal-code"
                type="date"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            </div>



              <div className="sm:col-span-4 mt-2">
                <div className="flex items-center">
                  <label htmlFor="address-1" className="block text-sm font-medium leading-6 text-gray-900 w-24">
                    Activities
                  </label>
                  <div className="mt-2 flex-1">
                    <textarea
                      name="address-1"
                      id="address-1"
                      rows={4}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4 mt-3">
                <div className="flex items-center">
                  <label htmlFor="address-2" className="block text-sm font-medium leading-6 text-gray-900 w-24">
                    Descriptions
                  </label>
                  <div className="flex-1">
                    <textarea
                      name="address-2"
                      id="address-2"
                      rows={4}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </>
    )
  }
  
  export default CardAddEducation;
  