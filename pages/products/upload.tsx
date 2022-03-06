import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutations from "@libs/client/useMutations";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Product } from ".prisma/client";

interface UploadProductForm {
    name: string;
    price: number;
    description: string;
}

interface UplaodProductMutation {
    ok: boolean;
    product: Product;
}

const Upload: NextPage = () => {
    const { register, handleSubmit } = useForm<UploadProductForm>();
    const [uploadProduct, { loading, data }] =
        useMutations<UplaodProductMutation>("/api/products");
    const onValid = (data: UploadProductForm) => {
        if (loading) return;
        uploadProduct(data);
    };
    const router = useRouter();
    useEffect(() => {
        if (data?.ok) {
            router.push(`/products/${data.product.id}`);
        }
    }, [data, router]);
    return (
        <Layout canGoBack>
            <form
                className='px-4 py-16 space-y-5'
                onSubmit={handleSubmit(onValid)}
            >
                <div>
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

                        <input className='hidden' type='file' />
                    </label>
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