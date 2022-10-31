import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutations from "@libs/client/useMutations";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from ".prisma/client";
import Image from "next/image";

interface UploadProductForm {
    name: string;
    price: number;
    description: string;
    photo: FileList;
}

interface UplaodProductMutation {
    ok: boolean;
    product: Product;
}

const Upload: NextPage = () => {
    const { register, handleSubmit, watch } = useForm<UploadProductForm>();
    const [uploadProduct, { loading, data }] =
        useMutations<UplaodProductMutation>("/api/products");
    const onValid = async ({ name, price, description }: UploadProductForm) => {
        if (loading) return;
        if (photo && photo.length > 0) {
            const { uploadURL } = await (await fetch(`/api/files`)).json();
            const form = new FormData();
            form.append("file", photo[0], name);
            const {
                result: { id },
            } = await (
                await fetch(uploadURL, { method: "POST", body: form })
            ).json();
            uploadProduct({ name, price, description, photoId: id });
        } else {
            uploadProduct({ name, price, description });
        }
    };
    const router = useRouter();
    useEffect(() => {
        if (data?.ok) {
            router.push(`/products/${data.product.id}`);
        }
    }, [data, router]);
    const photo = watch("photo");
    const [photoPreview, setPhotoPreview] = useState("");
    useEffect(() => {
        if (photo && photo.length > 0) {
            const file = photo[0];
            setPhotoPreview(URL.createObjectURL(file));
        }
    }, [photo]);
    return (
        <Layout canGoBack>
            <form
                className='px-4 py-16 space-y-5'
                onSubmit={handleSubmit(onValid)}
            >
                <div>
                    {photoPreview ? (
                        <Image
                            src={photoPreview}
                            className='w-full text-gray-600 h-46 rounded-md'
                            alt='privewImg'
                        />
                    ) : (
                        <label className='w-full text-gray-600 cursor-pointer hover:text-orange-500 hover:border-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 py-6 h-48 rounded-md'>
                            <svg
                                className='h-12 w-12'
                                stroke='currentColor'
                                fill='none'
                                viewBox='0 0 48 48'
                                aria-hidden='true'
                            >
                                <path
                                    d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                    strokeWidth={2}
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>

                            <input
                                {...register("photo")}
                                accept='image/*'
                                className='hidden'
                                type='file'
                            />
                        </label>
                    )}
                </div>
                <div>
                    <Input
                        register={register("name", { required: true })}
                        label='Name'
                        name='name'
                        type='text'
                    />
                </div>
                <div>
                    <Input
                        register={register("price", { required: true })}
                        kind='price'
                        name='price'
                        label='Price'
                        type='text'
                        placeholder='0.00'
                    />
                </div>
                <div>
                    <Textarea
                        register={register("description", { required: true })}
                        name='description'
                        label='Description'
                    />
                </div>
                <Button text={loading ? "Loading... " : "Upload item"} />
            </form>
        </Layout>
    );
};

export default Upload;
