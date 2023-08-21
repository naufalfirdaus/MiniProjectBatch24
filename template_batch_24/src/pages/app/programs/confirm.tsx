import React from "react";
import Link from "next/link";
import Header from "./Header";

const confirm = () => {
  return (
    <>
      <Header></Header>
      <div className="flex flex-col items-center content-center mt-60">
        <h2 className=" font-weight text-2xl  mb-5">Confirmation</h2>
        <p>
          Terimakasih sudah apply untuk mengikuti bootcamp regular bersama
          CodeAcademy, silahkan check email untuk step berikutnya. Click{" "}
          <Link href={`/app/programs`} className="text-blue-800 underline">
            Home{" "}
          </Link>
          untuk kembali.
        </p>
      </div>
    </>
  );
};

export default confirm;
