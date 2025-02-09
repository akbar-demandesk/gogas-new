import BottomNavbar from "@/components/BottomNavbar/BottomNavbar";
import GoGasFormProcess1 from "@/components/GoGoasForm1/GoGasProcess1";
import React from "react";

export async function getStaticProps() {
  return {
    props: {}, // Required to enable static generation
  };
}

function GoGasForm() {
  return (
    <>
      <div className="min-h-screen bg-[#FFE6A9] flex items-center justify-center ">
        <div>
          <GoGasFormProcess1 />
        </div>
        {/* <div>
          <BottomNavbar />
        </div> */}
      </div>
    </>
  );
}

export default GoGasForm;
