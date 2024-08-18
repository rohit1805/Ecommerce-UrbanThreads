// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export function Signup() {
//   const [email, setEmail] = useState("");
//   // const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   return (
//     <div>
//       <div>
//         <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
//           <div class="sm:mx-auto sm:w-full sm:max-w-sm">
//             <h1 className=" text-xl md:text-2xl text-center mt-10">
//               <span className="font-fondamento font-extrabold text-2xl md:text-3xl  text-pink-600">
//                 Urban
//               </span>
//               <span className="font-kavivanor text-neutral-950">Threads</span>
//             </h1>
//             <h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//               Sign in to your account
//             </h2>
//           </div>

//           <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-4">
//             <div>
//               <label
//                 // for="email"
//                 class="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Email address
//               </label>
//               <div class="mt-1">
//                 <input
//                   type="text"
//                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6 px-2 outline-none"
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                   }}
//                 />
//               </div>
//             </div>
//             {/* <div>
//               <label
//                 // for="email"
//                 class="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Username
//               </label>
//               <div class="mt-1">
//                 <input
//                   type="text"
//                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6 px-2 outline-none"
//                   onChange={(e) => {
//                     setUsername(e.target.value);
//                   }}
//                 />
//               </div>
//             </div> */}
//             <div>
//               <label
//                 // for="email"
//                 class="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Password
//               </label>
//               <div class="mt-1">
//                 <input
//                   type="password"
//                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6 px-2 outline-none"
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                   }}
//                 />
//               </div>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 class={`flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
//                   !email || !password ? " cursor-not-allowed" : ""
//                 } `}
//                 onClick={async () => {
//                   const res = await axios.post(
//                     "http://localhost:3000/user/signup",

//                     {
//                       email: email,
//                       password: password,
//                     },
//                     {
//                       headers: {
//                         "Content-Type": "application/json",
//                       },
//                     }
//                   );
//                   // console.log(res.data.msg);
//                   localStorage.setItem("token", `Bearer ${res.data.token}`);
//                   navigate("/");
//                   // console.log(typeof email);
//                   // console.log(typeof username);
//                   // console.log(typeof password);
//                 }}
//               >
//                 Sign in
//               </button>
//             </div>
//             <p class="mt-10 text-center text-sm text-gray-500">
//               Already have account?
//               <a
//                 href="/login"
//                 class="font-semibold leading-6 text-pink-600 hover:text-pink-500"
//               >
//                 Login here!
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/////////////////////////////////////////////////////////////////////////////////

// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const isFormValid = email.trim() !== "" && password.trim() !== "";

//   return (
//     <div>
//       <div>
//         <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
//           <div class="sm:mx-auto sm:w-full sm:max-w-sm">
//             <h1 className=" text-xl md:text-2xl text-center mt-10">
//               <span className="font-fondamento font-extrabold text-2xl md:text-3xl  text-pink-600">
//                 Urban
//               </span>
//               <span className="font-kavivanor text-neutral-950">Threads</span>
//             </h1>
//             <h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//               Sign in to your account
//             </h2>
//           </div>

//           <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-4">
//             <div>
//               <label class="block text-sm font-medium leading-6 text-gray-900">
//                 Email address
//               </label>
//               <div class="mt-1">
//                 <input
//                   type="text"
//                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6 px-2 outline-none"
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                   }}
//                 />
//               </div>
//             </div>
//             <div>
//               <label class="block text-sm font-medium leading-6 text-gray-900">
//                 Password
//               </label>
//               <div class="mt-1">
//                 <input
//                   type="password"
//                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6 px-2 outline-none"
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                   }}
//                 />
//               </div>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 class={`flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 ${
//                   isFormValid ? "" : " cursor-not-allowed opacity-50"
//                 }`}
//                 disabled={!isFormValid}
//                 onClick={async () => {
//                   if (isFormValid) {
//                     const res = await axios.post(
//                       "http://localhost:3000/user/signup",
//                       {
//                         email,
//                         password,
//                       },
//                       {
//                         headers: {
//                           "Content-Type": "application/json",
//                         },
//                       }
//                     );
//                     localStorage.setItem("token", `Bearer ${res.data.token}`);
//                     navigate("/");
//                   }
//                 }}
//               >
//                 Sign in
//               </button>
//             </div>
//             <p class="mt-10 text-center text-sm text-gray-500">
//               Already have an account?
//               <a
//                 href="/login"
//                 class="font-semibold leading-6 text-pink-600 hover:text-pink-500"
//               >
//                 Login here!
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Check if email is not empty and password is at least 9 characters long
  const isFormValid = email.trim() !== "" && password.length >= 9;

  // Update password state and validate length
  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    if (pwd.length < 9) {
      setPasswordError("Password must be at least 9 characters.");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div>
      <div>
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-xl md:text-2xl text-center mt-10">
              <span className="font-fondamento font-extrabold text-2xl md:text-3xl text-pink-600">
                Urban
              </span>
              <span className="font-kavivanor text-neutral-950">Threads</span>
            </h1>
            <h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-4">
            <div>
              <label class="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6 px-2 outline-none"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div class="mt-1">
                <input
                  type="password"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6 px-2 outline-none"
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <div className="text-red-500 text-sm mt-1">
                    {passwordError}
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                class={`flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 ${
                  isFormValid ? "" : " cursor-not-allowed opacity-50"
                }`}
                disabled={!isFormValid}
                onClick={async () => {
                  if (isFormValid) {
                    try {
                      const res = await axios.post(
                        "http://localhost:3000/user/signup",
                        {
                          email,
                          password,
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );
                      if (res.status === 200) {
                        localStorage.setItem(
                          "token",
                          `Bearer ${res.data.token}`
                        );
                        navigate("/");
                      }
                    } catch (error) {
                      if (error.response && error.response.status === 400) {
                        const { data } = error.response;
                        if (
                          data.msg ===
                          "Email already exists, use different email ID."
                        ) {
                          toast.error(data.msg, {
                            position: "bottom-right",
                            theme: "dark",
                          });
                        } else {
                          toast.error(
                            "Something went wrong. Please try again."
                          );
                        }
                      } else {
                        console.error("Error during signup:", error);
                        toast.error(
                          "An unexpected error occurred. Please try again later."
                        );
                      }
                    }

                    // if (res.status === 400) {
                    //   console.log("Error encountered");
                    //   toast(res.data.msg);
                    // }

                    // localStorage.setItem("token", `Bearer ${res.data.token}`);
                    // navigate("/");
                  }
                }}
              >
                Sign in
              </button>
            </div>

            <p class="mt-10 text-center text-sm text-gray-500">
              Already have an account?
              <a
                href="/login"
                class="font-semibold leading-6 text-pink-600 hover:text-pink-500"
              >
                Login here!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
