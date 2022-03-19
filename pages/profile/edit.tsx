import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import useUser from "@libs/client/useUser";
import { useEffect, useState } from "react";
import useMutations from "@libs/client/useMutations";

interface EidtProfileForm {
    name?: string;
    email?: string;
    phone?: string;
    formErros?: string;
    avatar?: FileList;
}

interface EditProfileResponse {
    ok: boolean;
    error?: string;
}

const EditProfile: NextPage = () => {
    const { user } = useUser();
    const {
        register,
        setValue,
        handleSubmit,
        setError,
        formState: { errors },
        watch,
    } = useForm<EidtProfileForm>();

    useEffect(() => {
        if (user?.email) setValue("email", user.email);
        if (user?.phone) setValue("phone", user.phone);
        if (user?.name) setValue("name", user.name);
    }, [user, setValue]);

    const [editProfile, { data, loading }] =
        useMutations<EditProfileResponse>(`/api/users/me`);

    const onValid = async ({ name, email, phone, avatar }: EidtProfileForm) => {
        if (loading) return;
        if (email === "" && phone === "" && name === "") {
            return setError("formErros", {
                message:
                    "Email OR PHone number are required. You need to choose one.",
            });
        }
        if (avatar && avatar.length > 0) {
            const cloudflareRequest = await (await fetch(`/api/files`)).json();
            console.log(cloudflareRequest);
            return;
            // editProfile({ email, phone, name, avatarUrl:CF URL });
        } else {
            editProfile({ email, phone, name });
        }
    };

    useEffect(() => {
        if (data && !data.ok && data.error) {
            setError("formErros", { message: data.error });
        }
    }, [data, setError]);

    const [avatarPreview, setAvatarPreview] = useState("");
    const avatar = watch("avatar");

    useEffect(() => {
        if (avatar && avatar.length > 0) {
            const file = avatar[0];
            setAvatarPreview(URL.createObjectURL(file));
        }
    }, [avatar]);

    return (
        <Layout title='Edit Profile' canGoBack>
            <form
                onSubmit={handleSubmit(onValid)}
                className='py-10 px-4 space-y-4'
            >
                <div className='flex items-center space-x-3'>
                    {avatarPreview ? (
                        <img
                            src={avatarPreview}
                            className='w-14 h-14 rounded-full bg-slate-500'
                        />
                    ) : (
                        <div className='w-14 h-14 rounded-full bg-slate-500' />
                    )}
                    <label
                        htmlFor='picture'
                        className='cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:fint-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700'
                    >
                        Change
                        <input
                            {...register("avatar")}
                            id='picture'
                            type='file'
                            className='hidden'
                            accept='image/*'
                        />
                    </label>
                </div>
                <div>
                    <Input
                        register={register("name")}
                        required={false}
                        type='text'
                        name='name'
                        label='Name'
                    />
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
                    <span className='my-2 text-red-500 font-bold block m-auto'>
                        {errors.formErros.message}
                    </span>
                ) : null}
                <Button text={loading ? "Loading..." : "Update profile"} />
            </form>
        </Layout>
    );
};

export default EditProfile;
