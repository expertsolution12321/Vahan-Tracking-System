import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SigninImage from '../assets/images/login2.jpg';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log('Form data:', values);
    },
  });

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-50 p-4  ">
      <div></div>
      <div className="hidden md:block w-1/2 max-w-lg">
        <img src={SigninImage} alt="Sign In" className="w-full h-auto object-cover rounded-md shadow-lg" />
      </div>

      <div className="signInPage w-full max-w-sm md:max-w-md lg:max-w-lg sm:mt-0  md:mt-0   p-6 md:p-8 lg:p-10 rounded-md  ">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 sm:text-3xl">
          Sign In
        </h2>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`mt-2 block w-full rounded-md border-0 py-2 px-4 text-gray-900 ring-1 ring-inset ${
                formik.touched.email && formik.errors.email ? 'ring-red-500' : 'ring-gray-300'
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm`}
              placeholder="Enter Your Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={`mt-2 block w-full rounded-md border-0 py-2 px-4 text-gray-900 ring-1 ring-inset ${
                formik.touched.password && formik.errors.password ? 'ring-red-500' : 'ring-gray-300'
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm`}
              placeholder="Enter Your Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="mt-4 w-full flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:text-base"
          >
            Sign In
          </button>

          <p className="text-sm mt-6 text-center">
            Don't have an account?{' '}
            <Link className="text-blue-600 font-medium" to="/signUp">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
