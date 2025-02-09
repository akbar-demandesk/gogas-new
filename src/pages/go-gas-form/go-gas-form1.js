import GoGasProcess2 from "@/components/GoGoasForm1/GoGasProcess2";
import React from "react";

export async function getStaticProps() {
  return {
    props: {}, // Required to enable static generation
  };
}

function GoGasForm2() {
  return (
    <>
      <div className="min-h-screen bg-[#FFE6A9] flex items-center justify-center">
        <div>
          <GoGasProcess2 />
        </div>
      </div>
    </>
  );
}

export default GoGasForm2;
