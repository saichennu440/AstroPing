import React from 'react'
// import Footer from '@/components/HomePage/Footer'
// import ResponsiveNav from '@/components/ResponsiveNav/ResponsiveNav'
import './DeleteAccount.css'

const DeleteAccount = () => {
  return (
    <div className="bg-white" >
  {/* <ResponsiveNav />  */}

    <div className="max-w-[80%] mx-auto py-5 px-5  bg-white">
        <div
            className="flex justify-between w-full flex-col pt-10 flex-wrap text-2xl font-light text-gray-700"
        >
            <div className="text-3xl font-normal">Astroping Account Deletion Request</div>
            <br /><br />
            <div className="flex flex-col gap-5">
         To initiate the account deletion process for your Astroping account, please follow these steps:  <br /><br />
           <div className="text-xl">
            <strong className='text-2xl'>Access the Deletion Request Form:</strong>
            <li>Click on the following link to open the Astroping Account Deletion Request Form: <a className='text-green-500 font-medium underline' href="./DeleteForm"><strong>Account Deletion Request Form</strong></a></li>
           </div>
           <div className="text-xl">
            <strong className='text-2xl'>Fill Out the Form:</strong>
            <li>Provide the required information in the form, including:<br />
                Full Name<br />
                Mobile Number<br />
                Email Address</li>
           </div>
           <div className="text-xl">
            <strong className='text-2xl'>Submit Your Request:</strong>
            <li>Once you&apos;ve  filled out the form, submit your account deletion request by clicking the Submit button.</li>
           </div>
           <div className="text-xl">
            <strong className='text-2xl'>Review Process:</strong>
            <li>Our team will review your request promptly.</li>
           </div>
           <div className="text-xl">
            <strong className='text-2xl'>Confirmation Call or Email:</strong>
            <li>If necessary, our team may reach out to you via phone or email to confirm the account deletion request.</li>
           </div>
           <div className="text-xl">
            <strong className='text-2xl'>Finalize Account Deletion:</strong>
            <li>Upon confirmation, your Astroping account will be scheduled for deletion.</li>
           </div>
        <br /><br />
        Astroping Support
        Email: simran.sidhu@credmarg.com
        </div>
        </div>
    </div>
    {/* <Footer /> */}
    </div>
  )
}

export default DeleteAccount