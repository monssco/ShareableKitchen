import { Listing } from "src/graphql/generated/graphql"
import { FormikErrors, useFormik } from 'formik';
import { useState } from "react";
import { graphqlSDK } from "src/graphql/client";
import MonssSuccess from "../Alert/success";
import MonssError from "../Alert/error";

// Shape of form values
interface FormValues {
    content: string
}

const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    console.log("validate", values.content)
    if (!values.content) {
        errors.content = 'Required';
    }

    return errors;
};

const StartConversation = (listing: Listing) => {

    const [submission, setSubmission] = useState({
        error: false,
        success: false,
        message: ''
    })

    const formik = useFormik({
        initialValues: {
            content: ''
        },
        validate,
        onSubmit: async values => {
            // console.log("Someting")
            // alert(JSON.stringify(values, null, 2));
            // console.log("YO")
            let result = await graphqlSDK().startConversation({listingId: listing.id, content: values.content})

            if (result.startConversation.id) {
                setSubmission({
                    error: false,
                    success: true,
                    message: 'Your message was successfully delivered.'
                })
            } else {
                setSubmission({
                    error: true,
                    success: false,
                    message: 'unable to send message'
                })
            }
        },
    });

    return (
        <>
            {submission.success ? <div>
                <MonssSuccess text={"Your message was delivered successfully!"}  />
                </div>
                : 
                null
            }
            <form
                className={`w-full ${submission.success ? "hidden" : "block"} py-8`} onSubmit={formik.handleSubmit}>

                <p className=" text-xl py-3">Message the host</p>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <textarea name="content" onChange={formik.handleChange} className=" focus:ring-2 focus:ring-gray-600 no-resize appearance-none block w-full bg-white text-gray-700 border-2 border-gray-400 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-48 resize-y" id="content"></textarea>
                        <p className={`text-red-500 text-xs italic ${formik.errors.content && formik.touched.content ? `block` : `hidden`}`}>{formik.errors.content}</p>
                    </div>
                </div>
                
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3">

                        <button type="submit" className=" font-medium text-lg transition duration-300 ease-in-out h-16 bg-black border-black border-4 hover:bg-white text-white hover:text-black py-2 px-10 mr-1">
                            Submit
                        </button>
                    </div>

                </div>
                <div className={`py-5 ${submission.error ? `block` : `hidden`}`}>
                    <MonssError text={"Unable to send message, please try again."} />
                </div>
            </form>
        </>
    )
}

// interface InputProps {
//     name: string,
//     htmlFor: string,
//     label: string,
//     placeholder: string,
//     error: string, // for formik
//     touched: boolean, // for formik
//     type: string,
//     className?: string
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
//     onBlur: (e: React.FocusEvent<any>) => void,
// }

// const Input = (props: InputProps) => (
//     <div className={props.className}>
//         <label className="block tracking-wide text-black text-base" htmlFor={props.htmlFor}>
//             {props.label}
//         </label>
//         <input onBlur={props.onBlur} onChange={props.onChange} name={props.name} className={`appearance-none block w-full text-gray-700 border-b-2 border-gray-700 py-3 mb-3 leading-tight focus:outline-none focus:border-yellow-500 `} id={props.htmlFor} type={props.type} placeholder={props.placeholder} />
//         <p className={`text-red-500 text-xs italic ${props.error && props.touched ? `block` : `hidden`}`}>{props.error}</p>
//     </div>
// )


// interface SelectProps {
//     name: string,
//     label: string,
//     htmlFor: string,
//     className: string,
//     options: string[],
//     error: string,
//     touched: boolean,
//     handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
//     onBlur: (e: React.FocusEvent<any>) => void;
// }

// const Select = (props: SelectProps) => (
//     <div className={props.className}>
//         <label className="block tracking-wide text-black text-base" htmlFor={props.htmlFor}>
//             {props.label}
//         </label>
//         <select className="w-full p-2 ring-1 mt-3 ring-black " name={props.name} onChange={props.handleChange} onBlur={props.onBlur}>
//             {props.options.map((value) => {
//                 return (
//                     <option key={value} value={value}>
//                         {value}
//                     </option>
//                 )
//             })}
//         </select>
//         <p className={`text-red-500 text-xs italic ${props.error && props.touched ? `block` : `hidden`}`}>{props.error}</p>
//     </div>
// )


export default StartConversation;

// const StartMessage = (listing: Listing) => {



//     return (
//         <div>
//             <div className="py-3">
//             <p className="text-2xl">Hosted by</p>
//             <p>{listing.author.first_name}</p>
//             <div className="py-5">
//               <p className="text-lg py-5">Message the host</p>
//               <textarea name="messageHost" className=" no-resize appearance-none block w-full bg-white text-gray-700 border-2 border-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-48 resize-y" id="companyMission"></textarea>
//               <button type="submit" className=" font-medium text-lg transition duration-300 ease-in-out h-16 bg-black border-black border-4 hover:bg-white text-white hover:text-black py-2 px-10 mr-1">
//                             Submit
//                         </button>
//             </div>
//           </div>
//         </div>
//     )
// }

// export default StartMessage
