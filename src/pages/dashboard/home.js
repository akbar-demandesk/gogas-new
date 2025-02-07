"use client";
import { FaQrcode, FaPen, FaShieldAlt } from "react-icons/fa";
import { IoCloudOfflineOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import BottomNavbar from "@/components/BottomNavbar/BottomNavbar";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#FFE6A9]">
        <div className="grid grid-cols-2 gap-4 p-6">
          {/* Scanner Card */}
          <div
            className="bg-yellow-400 text-black rounded-lg p-6 flex flex-col items-center justify-center shadow-md cursor-pointer hover:bg-yellow-500 transition"
            onClick={() => router.push("/scanner")}
          >
            <FaQrcode className="text-3xl mb-2" />
            <p className="font-semibold">Scanner</p>
          </div>

          {/* Forms Card */}
          <div
            className="bg-yellow-400 text-black rounded-lg p-6 flex flex-col items-center justify-center shadow-md cursor-pointer hover:bg-yellow-500 transition"
            onClick={() => router.push("/forms")}
          >
            <FaPen className="text-3xl mb-2" />
            <p className="font-semibold">Forms</p>
          </div>

          {/* Offline Card */}
          <div
            className="bg-yellow-400 text-black rounded-lg p-6 flex flex-col items-center justify-center shadow-md cursor-pointer hover:bg-yellow-500 transition"
            onClick={() =>
              (window.location.href = "/offlinedata/offlinedatatable")
            }
          >
            {/* <FaWifi className="text-3xl mb-2" /> */}
            <IoCloudOfflineOutline className="text-3xl mb-2" />
            <p className="font-semibold">Offline</p>
          </div>

          {/* Privacy Card */}
          <div
            className="bg-white border border-gray-300 text-black rounded-lg p-6 flex flex-col items-center justify-center shadow-md cursor-pointer hover:bg-gray-100 transition"
            onClick={() => router.push("/privacy")}
          >
            <FaShieldAlt className="text-3xl mb-2 text-black" />
            <p className="font-semibold">Privacy</p>
          </div>
        </div>
      </div>
      <div>
        <BottomNavbar />
      </div>
    </>
  );
}
