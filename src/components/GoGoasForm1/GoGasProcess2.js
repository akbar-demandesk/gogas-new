"use client";
import { useState, useEffect, useRef } from "react";
import { FaQrcode, FaTag, FaCamera, FaHome } from "react-icons/fa";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";

function GoGasProcess2() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    scanData: "",
    couponCode: "",
    cashToBeCollected: "",
    dispenserAmount: "",
    extraAmount: "",
    capturedImage: "",
  });
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [showMarkOfflineBtn, setShowMarkOfflineBtn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== "undefined" && !navigator.onLine
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [qrCode, setQrCode] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize the localStorage array for storing form data
    if (!localStorage.getItem("gogasForm")) {
      localStorage.setItem("gogasForm", JSON.stringify([]));
    }

    // Add online and offline event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // const handleOnline = () => {
  //   setIsOffline(false);
  //   const gogasForm = JSON.parse(localStorage.getItem("gogasForm") || "[]");

  //   const unsyncData = gogasForm.filter((item) => item.status === "unsync");
  //   if (unsyncData.length > 0) {
  //     toast.info("Syncing offline data to the server...");
  //     setTimeout(() => {
  //       // Simulate syncing data to server
  //       const updatedData = gogasForm.map((item) =>
  //         item.status === "unsync" ? { ...item, status: "sync" } : item
  //       );

  //       localStorage.setItem("gogasForm", JSON.stringify(updatedData));
  //       toast.success("All offline data synced successfully!");
  //     }, 2000);
  //   }
  // };

  const handleOnline = () => {
    setIsOffline(false);
    toast.info("You are back online. Unsynced data is still available.");
  };

  const handleOffline = () => {
    setIsOffline(true);
    toast.warn("You are offline. Data will be saved locally.");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep(2);
  };

  // const markOffline = () => {
  //   const gogasForm = JSON.parse(localStorage.getItem("gogasForm") || "[]");

  //   // Check for duplicate coupon codes
  //   const isDuplicate = gogasForm.some(
  //     (item) => item.couponCode === formData.couponCode
  //   );

  //   if (isDuplicate) {
  //     toast.error("Already exists with this coupon code!");
  //     return; // Exit the function to avoid saving the duplicate
  //   }

  //   const newEntry = {
  //     ...formData,
  //     status: "unsync",
  //     createdAt: new Date().toISOString(),
  //   };

  //   gogasForm.push(newEntry);
  //   localStorage.setItem("gogasForm", JSON.stringify(gogasForm));

  //   toast.success("Data saved offline successfully!");
  // };

  // const markOffline = () => {
  //   const gogasForm = JSON.parse(localStorage.getItem("gogasForm") || "[]");

  //   // Ignore "processing" status when checking for duplicates
  //   const isDuplicate = gogasForm.some(
  //     (item) =>
  //       item.couponCode === formData.couponCode && item.status !== "processing"
  //   );

  //   if (isDuplicate) {
  //     toast.error("Already exists with this coupon code!");
  //     return; // Exit the function to avoid saving the duplicate
  //   }

  //   // Save new entry with "unsync" status
  //   const newEntry = {
  //     ...formData,
  //     status: "unsync",
  //     createdAt: new Date().toISOString(),
  //   };

  //   gogasForm.push(newEntry);
  //   localStorage.setItem("gogasForm", JSON.stringify(gogasForm));

  //   toast.success("Data saved offline successfully!");

  //   // Wait a short time before navigating to allow toast to display
  //   setTimeout(() => {
  //     window.location.href = "/dashboard/home";
  //   }, 1000); // 1-second delay
  // };

  const markOffline = () => {
    const gogasForm = JSON.parse(localStorage.getItem("gogasForm") || "[]");

    // Ignore "processing" status when checking for duplicates
    const isDuplicate = gogasForm.some(
      (item) =>
        item.couponCode === formData.couponCode && item.status !== "processing"
    );

    if (isDuplicate) {
      toast.error("Already exists with this coupon code!");
      return; // Exit the function to avoid saving the duplicate
    }

    // Save today's entry
    const todayEntry = {
      ...formData,
      status: "unsync",
      createdAt: new Date().toISOString(), // Today's date
    };

    // Add a STATIC past date entry for testing
    const pastEntry = {
      ...formData,
      status: "unsync",
      createdAt: "2024-01-15T12:30:00.000Z", // Static past date
      couponCode: formData.couponCode + "_past", // Different coupon code to avoid duplicate error
    };

    // Add both entries (today & past)
    gogasForm.push(todayEntry, pastEntry);
    localStorage.setItem("gogasForm", JSON.stringify(gogasForm));

    toast.success("Data saved offline successfully!");

    // Wait a short time before navigating to allow toast to display
    setTimeout(() => {
      window.location.href = "/dashboard/home";
    }, 1000); // 1-second delay
  };

  const generateQRCode = () => {
    const randomData = Math.random().toString(36).substring(2, 15);
    setQrCode(randomData);
    setFormData((prev) => ({ ...prev, scanData: randomData }));
  };

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraOpen(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch (error) {
      console.error("Error accessing the camera: ", error);
    }
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataURL = canvas.toDataURL("image/png");
      setFormData((prev) => ({ ...prev, capturedImage: imageDataURL }));

      localStorage.setItem("capturedImage", imageDataURL);
      toast.success("Photo captured and saved locally!");

      const stream = video.srcObject;
      const tracks = stream?.getTracks();
      tracks?.forEach((track) => track.stop());

      setIsCameraOpen(false);
    }
  };

  const handleComplete = () => {
    const gogasForm = JSON.parse(localStorage.getItem("gogasForm") || "[]");

    const isDuplicate = gogasForm.some(
      (item) => item.couponCode === formData.couponCode
    );

    if (isDuplicate) {
      toast.error("Already exists with this coupon code!");
      return;
    }

    setIsLoading(true);
    setShowMarkOfflineBtn(false);
    toast.info("Processing... Please wait 20 seconds.");

    const tempEntry = {
      ...formData,
      status: "processing",
      createdAt: new Date().toISOString(),
    };

    gogasForm.push(tempEntry);
    localStorage.setItem("gogasForm", JSON.stringify(gogasForm));

    setTimeout(() => {
      setIsLoading(false);

      let updatedForm = JSON.parse(localStorage.getItem("gogasForm") || "[]");

      updatedForm = updatedForm.map((item) =>
        item.couponCode === formData.couponCode
          ? { ...item, status: navigator.onLine ? "sync" : "unsync" }
          : item
      );

      localStorage.setItem("gogasForm", JSON.stringify(updatedForm));

      if (navigator.onLine) {
        toast.success("Data submitted online successfully!");
        setIsCompleted(true);
      } else {
        setShowMarkOfflineBtn(true);
        toast.warn("Network is offline. Data marked as unsync.");
      }
    }, 20000);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 ">
        <div
          className="bg-white shadow-xl border border-gray-200
 rounded-2xl p-6 w-full max-w-md mb-10"
        >
          <h1 className="text-xl font-semibold text-purple-700 mb-4 text-center">
            GoGas coupons redemption with camera
          </h1>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className={`bg-purple-600 h-2.5 rounded-full ${
                step === 1 ? "w-1/2" : "w-full"
              }`}
            ></div>
          </div>
          <p className="text-right text-sm text-gray-600 mb-4">
            Page {step} of 2
          </p>

          {step === 1 && (
            <>
              <div className="mb-6">
                <label className="block text-black-700 text-md font-medium mb-2">
                  1. Scan QR
                </label>
                <div className="flex justify-center mb-4">
                  <button
                    onClick={generateQRCode}
                    className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-24"
                  >
                    <FaQrcode className="mr-2" /> Scan
                  </button>
                </div>
                {mounted && qrCode && (
                  <div className="flex justify-center mb-4">
                    <QRCodeCanvas value={qrCode} size={128} />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-black-700 text-md font-medium mb-2">
                  2. Coupon code <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <FaTag className="absolute left-3 top-3 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleChange}
                    placeholder="Enter coupon code"
                    className="w-full border border-gray-300 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-black-700 text-md font-medium mb-2">
                  3. Cash To Be Collected{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cashToBeCollected"
                  value={formData.cashToBeCollected}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6">
                <label className="block text-black-700 text-md font-medium mb-2">
                  4. Amount To Be Mentioned in Despenser
                </label>
                <input
                  type="text"
                  name="dispenserAmount"
                  value={formData.dispenserAmount}
                  onChange={handleChange}
                  placeholder="Enter Dispenser Amount"
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* <div className="mb-6">
                <label className="block text-black-700 text-md font-medium mb-2">
                  5. Take a picture of the dispenser after dispensing
                  <span className="text-red-500">*</span>
                </label>

                <div className="flex justify-center">
                  {!isCameraOpen && (
                    <button
                      onClick={handleOpenCamera}
                      className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-white font-bold p-3 rounded-full transition duration-300"
                    >
                      <FaCamera className="text-xl" />
                    </button>
                  )}
                </div>

                {isCameraOpen && (
                  <div className="flex justify-center mt-4">
                    <video
                      ref={videoRef}
                      className="border rounded-lg shadow-md"
                      width="300"
                      height="150"
                      autoPlay
                    />
                  </div>
                )}

                {isCameraOpen && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handleCapture}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                      Capture Photo
                    </button>
                  </div>
                )}

                {formData.capturedImage && (
                  <div className="mt-4 text-center">
                    <p className="font-semibold">📸 Captured Image:</p>
                    <img
                      src={formData.capturedImage}
                      alt="Captured"
                      className="rounded-lg shadow-md mt-2"
                      width="300"
                    />
                  </div>
                )}

                <canvas
                  ref={canvasRef}
                  style={{ display: "none" }}
                  width="300"
                  height="150"
                />
              </div> */}
              <div className="mb-6">
                <label className="block text-black-700 text-md font-medium mb-2">
                  5. Take a picture of the dispenser after dispensing
                  <span className="text-red-500">*</span>
                </label>

                {/* Capture Button (Before Opening Camera) */}
                <div className="flex justify-center">
                  {!isCameraOpen && !formData.capturedImage && (
                    <button
                      onClick={handleOpenCamera}
                      className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-white font-bold p-4 rounded-full transition duration-300 shadow-lg hover:scale-110"
                    >
                      <FaCamera className="text-2xl" />
                    </button>
                  )}
                </div>

                {/* Live Camera Preview */}
                {isCameraOpen && (
                  <div className="flex flex-col items-center mt-4">
                    <video
                      ref={videoRef}
                      className="border-4 border-gray-300 rounded-lg shadow-md"
                      width="320"
                      height="180"
                      autoPlay
                    />

                    {/* Capture Button */}
                    <button
                      onClick={handleCapture}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md mt-4"
                    >
                      Capture Photo
                    </button>
                  </div>
                )}

                {/* Captured Image Display */}
                {formData.capturedImage && (
                  <div className="mt-6 flex flex-col items-center bg-white shadow-lg p-4 rounded-lg border border-gray-200">
                    <p className="font-semibold text-gray-700">
                      📸 Captured Image:
                    </p>
                    <Image
                      src={formData.capturedImage}
                      alt="Captured"
                      className="rounded-lg shadow-md mt-2 border border-gray-300"
                      width="320"
                    />
                  </div>
                )}

                <canvas
                  ref={canvasRef}
                  style={{ display: "none" }}
                  width="320"
                  height="180"
                />
              </div>

              <div className="mb-4">
                <label className="block text-black-700 text-md font-medium mb-2">
                  6. Maximum Extraa Amount (in Rs)
                </label>
                <input
                  type="text"
                  name="extraAmount"
                  value={formData.extraAmount}
                  onChange={handleChange}
                  placeholder="Enter Extra Amount"
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* {isOffline ? (
                <div className="flex flex-col sm:flex-row max-w-[408px]:flex-col justify-between mt-2 gap-2 w-full">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-white border border-purple-700 text-purple-700 font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-purple-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => (window.location.href = "/dashoard/home")}
                    className="bg-white border border-purple-700 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
                  >
                    <FaHome className="inline mr-1" /> Home
                  </button>
                  <button
                    onClick={markOffline}
                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Mark Offline
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row max-w-[408px]:flex-col justify-between gap-2 w-full">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-white border border-purple-700 text-purple-700 font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-purple-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => (window.location.href = "/dashboard/home")}
                    className="bg-white border border-purple-700 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
                  >
                    <FaHome className="inline mr-1" /> Home
                  </button>

                  {isLoading ? (
                    <button
                      className="bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                      disabled
                    >
                      Processing...
                    </button>
                  ) : showMarkOfflineBtn ? (
                    <div className="flex gap-2">
                      <button
                        onClick={markOffline}
                        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Mark Offline
                      </button>
                      <button
                        onClick={() =>
                          (window.location.href = "/dashboard/home")
                        }
                        className="bg-white border border-purple-700 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        <FaHome className="inline mr-1" /> Home
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleComplete}
                      className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                      Complete
                    </button>
                  )}
                </div>
              )} */}
              {isOffline ? (
                <div className="flex flex-row max-[408px]:flex-col justify-between mt-2 gap-2 w-full">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-white border border-purple-700 text-purple-700 font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-purple-50 w-full max-[408px]:w-full"
                  >
                    Previous
                  </button>
                  {/* <button
                    onClick={() => (window.location.href = "/dashboard/home")}
                    className="bg-white border border-purple-700 text-black font-bold py-2 px-4 rounded-lg transition duration-300 w-full max-[408px]:w-full"
                  >
                    <FaHome className="inline mr-1" /> Home
                  </button> */}
                  <button
                    onClick={markOffline}
                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-full max-[408px]:w-full"
                  >
                    Mark Offline
                  </button>
                </div>
              ) : (
                <div className="flex flex-row max-[408px]:flex-col justify-between gap-2 w-full">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-white border border-purple-700 text-purple-700 font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-purple-50 w-full max-[408px]:w-full"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => (window.location.href = "/dashboard/home")}
                    className="bg-white border border-purple-700 text-black font-bold py-2 px-4 rounded-lg transition duration-300 w-full max-[408px]:w-full"
                  >
                    <FaHome className="inline mr-1" /> Home
                  </button>

                  {isLoading ? (
                    <button
                      className="bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 opacity-50 cursor-not-allowed w-full max-[408px]:w-full"
                      disabled
                    >
                      Processing...
                    </button>
                  ) : showMarkOfflineBtn ? (
                    <div className="flex flex-row max-[408px]:flex-col gap-2 w-full">
                      <button
                        onClick={markOffline}
                        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-full max-[408px]:w-full"
                      >
                        Mark Offline
                      </button>
                      <button
                        onClick={() =>
                          (window.location.href = "/dashboard/home")
                        }
                        className="bg-white border border-purple-700 text-black font-bold py-2 px-4 rounded-lg transition duration-300 w-full max-[408px]:w-full"
                      >
                        <FaHome className="inline mr-1" /> Home
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleComplete}
                      className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-full max-[408px]:w-full"
                    >
                      Complete
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          <div className="text-center mt-4 text-sm text-purple-600">
            Forms by <span className="font-bold text-yellow-700">MTPL</span>
          </div>
        </div>
      </div>
      <div>
        <BottomNavbar />
      </div>
      <div className="md:mt-5" />

      <div>
        <ToastContainer />
      </div>
      {/* {isOffline && (
        <div className="flex justify-between mt-2">
          <button
            onClick={markOffline}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Mark Offline
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            <FaHome className="inline mr-1" /> Home
          </button>
        </div>
      )} */}
    </>
  );
}

export default GoGasProcess2;
