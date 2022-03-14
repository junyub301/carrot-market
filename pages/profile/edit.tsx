import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import useUser from "@libs/client/useUser";
import { useEffect } from "react";

interface EidtProfileForm {
    email?: string;
    phone?: string;
    formErros?: string;
}

const EditProfile: NextPage = () => {
    const { user } = useUser();
    const {
        register,
        setValue,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<EidtProfileForm>();
    useEffect(() => {
        if (user?.email) setValue("email", user.email);
        if (user?.phone) setValue("phone", user.phone);
    }, [user, setValue]);
    const onValid = ({ email, phone }: EidtProfileForm) => {
        if (email === "" && phone === "") {
            setError("formErros", {
                message:
                    "Email OR PHone number are required. You need to choose one.",
            });
        }
    };
    return (
        <Layout title='Edit Profile' canGoBack>
            <form
                onSubmit={handleSubmit(onValid)}
                className='py-10 px-4 space-y-4'
            >
                <div className='flex items-center space-x-3'>
                    <div className='w-14 h-14 rounded-full bg-slate-500' />
                    <label
                        htmlFor='picture'
                        className='cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:fint-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700'
                    >
                        Change
                        <input
                            id='picture'
                            type='file'
                            className='hidden'
                            accept='image/*'
                        />
                    </label>
                </div>
                <div>
                    <Input
                        register={register("email")}
                        required={false}
                        type='email'
                        name='email'
                        label='Email address'
                    />
                    <Input
                        register={register("phone")}
                        required={false}
                        name='phone'
                        kind='phone'
                        label='Phone number'
                        type='text'
                    />
                </div>
                {errors.formErros ? (
                    <span className='my-2 text-red-500 font-bold block'>
                        {errors.formErros.message}
                    </span>
                ) : null}
                <Button text='Update profile' />
            </form>
        </Layout>
    );
};

export default EditProfile;
