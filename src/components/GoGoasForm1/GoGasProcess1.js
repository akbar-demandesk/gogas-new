import { useState } from "react";
import { useRouter } from "next/router";

export default function GoGasForm() {
  const [selectedForm, setSelectedForm] = useState("");
  const router = useRouter();

  const handleGoTo = () => {
    if (selectedForm === "GoGas ALPG Sales with Coupon") {
      router.push("/go-gas-form/go-gas-form1");
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center p-4">
    //   <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
    //     <h1 className="text-2xl font-semibold text-center mb-4">
    //       Go Gas forms
    //     </h1>
    //     <div className="text-sm text-gray-700 mb-4">
    //       <p>
    //         <strong>User name:</strong> 7738657063
    //       </p>
    //       <p>
    //         <strong>Shift:</strong>
    //       </p>
    //       <p>
    //         <strong>Dispenser no:</strong>
    //       </p>
    //       <p>
    //         <strong>Dispenser side:</strong>
    //       </p>
    //       <p>
    //         <strong>Station name:</strong> MS.AI002.Nagpur.Imamabada
    //       </p>
    //     </div>

    //     <form className="space-y-3">
    //       <div>
    //         <label className="flex items-center space-x-2 cursor-pointer">
    //           <input
    //             type="radio"
    //             name="formType"
    //             className="form-radio text-blue-600 cursor-pointer"
    //             value="GoGas new ALPG customer registration"
    //             onChange={(e) => setSelectedForm(e.target.value)}
    //           />
    //           <span className="text-blue-600">
    //             {" "}
    //             GoGas new ALPG customer registration
    //           </span>
    //         </label>
    //       </div>
    //       <div>
    //         <label className="flex items-center space-x-2 cursor-pointer">
    //           <input
    //             type="radio"
    //             name="formType"
    //             className="form-radio text-green-600 cursor-pointer"
    //             value="GoGas ALPG Sales with Coupon"
    //             onChange={(e) => setSelectedForm(e.target.value)}
    //           />
    //           <span className="text-green-600">
    //             GoGas ALPG Sales with Coupon
    //           </span>
    //         </label>
    //       </div>
    //       <div>
    //         <label className="flex items-center space-x-2 cursor-pointer">
    //           <input
    //             type="radio"
    //             name="formType"
    //             className="form-radio text-purple-600 cursor-pointer"
    //             value="GoGas ALPG Sales without Coupon without wallet"
    //             onChange={(e) => setSelectedForm(e.target.value)}
    //           />
    //           <span className=" text-purple-600">
    //             GoGas ALPG Sales without Coupon without wallet
    //           </span>
    //         </label>
    //       </div>
    //       <div>
    //         <label className="flex items-center space-x-2 cursor-pointer">
    //           <input
    //             type="radio"
    //             name="formType"
    //             className="form-radio text-yellow-600 cursor-pointer"
    //             value="GoGas ALPG Sales with Wallet Coin"
    //             onChange={(e) => setSelectedForm(e.target.value)}
    //           />
    //           <span className="text-yellow-600">
    //             GoGas ALPG Sales with Wallet Coin
    //           </span>
    //         </label>
    //       </div>

    //       <button
    //         type="button"
    //         onClick={handleGoTo}
    //         className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
    //       >
    //         GO TO
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Go Gas Forms
        </h1>
        <div className="text-sm text-gray-700 mb-4 space-y-1">
          <p>
            <strong>User name:</strong> 7738657063
          </p>
          <p>
            <strong>Shift:</strong> Morning
          </p>
          <p>
            <strong>Dispenser no:</strong> 3
          </p>
          <p>
            <strong>Dispenser side:</strong> Left
          </p>
          <p>
            <strong>Station name:</strong> MS.AI002.Nagpur.Imamabada
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="formType"
                className="form-radio text-blue-600 cursor-pointer"
                value="GoGas new ALPG customer registration"
                onChange={(e) => setSelectedForm(e.target.value)}
              />
              <span className="text-blue-800">
                GoGas new ALPG customer registration
              </span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="formType"
                className="form-radio text-green-600 cursor-pointer"
                value="GoGas ALPG Sales with Coupon"
                onChange={(e) => setSelectedForm(e.target.value)}
              />
              <span className="text-green-800">
                GoGas ALPG Sales with Coupon
              </span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="formType"
                className="form-radio text-purple-600 cursor-pointer"
                value="GoGas ALPG Sales without Coupon without wallet"
                onChange={(e) => setSelectedForm(e.target.value)}
              />
              <span className=" text-purple-800">
                GoGas ALPG Sales without Coupon without wallet
              </span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="formType"
                className="form-radio text-yellow-600 cursor-pointer"
                value="GoGas ALPG Sales with Wallet Coin"
                onChange={(e) => setSelectedForm(e.target.value)}
              />
              <span className="text-yellow-800">
                GoGas ALPG Sales with Wallet Coin
              </span>
            </label>
          </div>

          <button
            type="button"
            onClick={handleGoTo}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            GO TO
          </button>
        </form>
      </div>
    </div>
  );
}
