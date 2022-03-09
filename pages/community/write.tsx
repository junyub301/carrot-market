import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutations from "@libs/client/useMutations";
import { useEffect } from "react";
import { Post } from ".prisma/client";
import { useRouter } from "next/router";
import useCoords from "@libs/client/useCoords";

interface WriteForm {
    question: string;
}

interface WriteResponse {
    ok: boolean;
    post: Post;
}

const Write: NextPage = () => {
    const { latitude, longitude } = useCoords();
    const router = useRouter();
    const { register, handleSubmit } = useForm<WriteForm>();
    const [post, { data, loading }] = useMutations<WriteResponse>("/api/posts");
    const onValid = (data: WriteForm) => {
        if (loading) return;
        post({ ...data, latitude, longitude });
    };
    useEffect(() => {
        if (data && data.ok) {
            router.push(`/community/${data.post.id}`);
        }
    }, [data, router]);
    return (
        <Layout canGoBack title='Write post'>
            <form className='p-4 space-y-4' onSubmit={handleSubmit(onValid)}>
                <Textarea
                    register={register("question", {
                        required: true,
                        minLength: 5,
                    })}
                    placeholder='Ask a question!'
                />

                <Button text={loading ? "Loading..." : "Submit"} />
            </form>
        </Layout>
    );
};

export default Write;
