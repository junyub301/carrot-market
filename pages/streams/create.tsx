import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutations from "@libs/client/useMutations";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Stream } from ".prisma/client";

interface CreateForm {
    name: string;
    price: string;
    description: string;
}

interface CreateResponse {
    ok: boolean;
    stream: Stream;
}

const Create: NextPage = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<CreateForm>();
    const [createStream, { data, loading }] =
        useMutations<CreateResponse>(`/api/streams`);
    const onValid = (form: CreateForm) => {
        if (loading) return;
        createStream(form);
    };

    useEffect(() => {
        if (data && data.ok) {
            router.push(`/streams/${data.stream.id}`);
        }
    }, [data, router]);

    return (
        <Layout canGoBack>
            <form
                onSubmit={handleSubmit(onValid)}
                className='py-10 px-4 space-y-5'
            >
                <Input
                    register={register("name", {
                        required: true,
                    })}
                    label='Name'
                    name='name'
                    type='name'
                />
                <Input
                    register={register("price", {
                        required: true,
                        valueAsNumber: true,
                    })}
                    label='Price'
                    name='price'
                    type='text'
                    kind='price'
                />

                <Textarea
                    register={register("description", { required: true })}
                    label='Description'
                    name='description'
                />
                <Button text={loading ? "Loading..." : "Go live"} />
            </form>
        </Layout>
    );
};

export default Create;
