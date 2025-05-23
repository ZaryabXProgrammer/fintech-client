import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, User, ChevronLeft } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { publicRequest } from '../lib/RequestMethods';

// Validation schema using Yup
const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };



    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setIsLoading(true);

            const { firstName, lastName, email, password } = values;

            // Combine first and last names
            const name = `${firstName} ${lastName}`;

            // Send data to the backend
            const response = await publicRequest.post("/auth/register", {
                name,
                email,
                password,
            });


            navigate('/login')

            console.log('Form data submitted:', response.data);
            // console.log('Form data submitted:', values);
            toast.success('Account created successfully!');
            resetForm();

            setTimeout(() => {
                navigate('/login');
            }, 4000);

        } catch (error) {
            toast.error('An error occurred while creating your account.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    // Animation variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <div className="mt-[0.5%] max-w-[90%] mx-auto bg-white rounded-3xl overflow-hidden shadow-lg">
            <Toaster position="top-center" />

            <div className="flex flex-col md:flex-row">
                {/* Left side - Form */}
                <motion.div
                    className="w-full md:w-1/2 p-8 md:p-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="flex items-center mb-6">
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-themeGreen flex items-center justify-center mr-2">
                                <User className="text-white h-5 w-5" />
                            </div>
                            <span className="text-gray-800 font-medium text-lg">Register</span>
                        </div>

                        <div className="ml-auto space-x-4">
                            <Link to="/" className="text-gray-400 hover:text-themeGreen transition">Home</Link>

                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-6 mt-8">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">START FOR FREE</p>
                        <h1 className="text-4xl font-bold text-gray-800 mt-2">Create new account<span className="text-themeGreen">.</span></h1>
                        <p className="mt-4 text-gray-600">
                            Already A Member? <Link to="/login" className="text-themeGreen hover:underline">Log In</Link>
                        </p>
                    </motion.div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <div className="flex flex-col md:flex-row gap-4 mb-4">
                                    <motion.div variants={itemVariants} className="w-full">
                                        <label htmlFor="firstName" className="block text-sm text-gray-600 mb-1">First name</label>
                                        <div className="relative">
                                            <Field
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className={`w-full py-3 px-4 text-black bg-gray-50 border rounded-lg focus:outline-none focus:border-themeGreen transition ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-200'}`}
                                                placeholder="Michal"
                                            />
                                            <ErrorMessage name="firstName">
                                                {msg => <p className="text-red-500 text-xs mt-1">{msg}</p>}
                                            </ErrorMessage>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="w-full">
                                        <label htmlFor="lastName" className="block text-sm text-gray-600 mb-1">Last name</label>
                                        <div className="relative">
                                            <Field
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className={`w-full text-black py-3 px-4 bg-gray-50 border rounded-lg focus:outline-none focus:border-themeGreen transition ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-200'}`}
                                                placeholder="Masiak"
                                            />
                                            <ErrorMessage name="lastName">
                                                {msg => <p className="text-red-500 text-xs mt-1">{msg}</p>}
                                            </ErrorMessage>
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div variants={itemVariants} className="mb-4">
                                    <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email</label>
                                    <div className="relative">
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={`w-full py-3 px-4 text-black bg-gray-50 border rounded-lg focus:outline-none focus:border-themeGreen transition ${errors.email && touched.email ? 'border-red-500' : 'border-gray-200'}`}
                                            placeholder="michal.masiak@anywhere.co"
                                        />
                                        <Mail className="absolute right-3 top-3 text-gray-400 h-5 w-5" />
                                        <ErrorMessage name="email">
                                            {msg => <p className="text-red-500 text-xs mt-1">{msg}</p>}
                                        </ErrorMessage>
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants} className="mb-6">
                                    <label htmlFor="password" className="block text-sm text-gray-600 mb-1">Password</label>
                                    <div className="relative">
                                        <Field
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            className={`w-full py-3 text-black px-4 bg-gray-50 border rounded-lg focus:outline-none focus:border-themeGreen transition ${errors.password && touched.password ? 'border-red-500' : 'border-gray-200'}`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                        <ErrorMessage name="password">
                                            {msg => <p className="text-red-500 text-xs mt-1">{msg}</p>}
                                        </ErrorMessage>
                                    </div>
                                </motion.div>

                                <div className="flex items-center justify-between mt-8">


                                    <motion.button
                                        variants={itemVariants}
                                        type="submit"
                                        disabled={isLoading || isSubmitting}
                                        className="px-8 py-3 rounded-lg bg-themeGreen text-white font-medium hover:bg-opacity-90 transition flex items-center justify-center min-w-32"
                                    >
                                        {isLoading || isSubmitting ? (
                                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            'Create account'
                                        )}
                                    </motion.button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </motion.div>

                {/* Right side - Image */}
                <div className="w-full md:w-1/2 relative">
                    <motion.div
                        className="h-full  flex items-center justify-center"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="/registerPic2.svg"
                            alt="Mountains and lake"
                            className="w-[85%]  mx-auto object-cover"
                        />
                        <div className="absolute bottom-6 right-6">
                            <svg width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0H10L20 30H10L0 0Z" fill="white" />
                                <path d="M20 0H30L40 30H30L20 0Z" fill="white" />
                                <path d="M40 0H50L40 30H30L40 0Z" fill="white" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}