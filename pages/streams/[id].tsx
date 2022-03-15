import type { NextPage } from "next";
import Layout from "@components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Stream } from ".prisma/client";
import { useForm } from "react-hook-form";
import useMutations from "@libs/client/useMutations";
import useUser from "@libs/client/useUser";
import { cls } from "@libs/utils";
import { useEffect } from "react";

interface StreamMessage {
    message: string;
    id: number;
    user: {
        avatar?: string;
        id: number;
    };
}

interface StreamWithMessage extends Stream {
    messages: StreamMessage[];
}
interface StreamResponse {
    ok: boolean;
    stream: StreamWithMessage;
}

interface MessageForm {
    message: string;
}

const StreamDetail: NextPage = () => {
    const router = useRouter();
    const { user } = useUser();
    const { register, handleSubmit, reset } = useForm<MessageForm>();
    const { data, mutate } = useSWR<StreamResponse>(
        router?.query?.id ? `/api/streams/${router.query.id}` : null
    );
    const [sendMessage, { loading, data: sendMessageData }] = useMutations(
        `/api/streams/${router.query.id}/messages`
    );
    const onValid = (form: MessageForm) => {
        if (loading) return;
        reset();
        sendMessage(form);
    };

    useEffect(() => {
        if (sendMessageData && sendMessageData.ok) {
            mutate();
        }
    }, [sendMessageData, mutate]);

    return (
        <Layout canGoBack>
            <div className='py-10 px-4  space-y-4'>
                <div className='w-full rounded-md shadow-sm bg-slate-300 aspect-video' />
                <div className='mt-5'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        {data?.stream?.name}
                    </h1>
                    <span className='text-2xl block mt-3 text-gray-900'>
                        ${data?.stream?.price}
                    </span>
                    <p className=' my-6 text-gray-700'>
                        {data?.stream?.description}
                    </p>
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-gray-900'>
                        Live Chat
                    </h2>
                    <div className='py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4'>
                        {data?.stream.messages.map((message) => (
                            <div
                                className={cls(
                                    "flex items-start space-x-2",
                                    message.user.id === user?.id
                                        ? "flex-row-reverse space-x-reverse"
                                        : ""
                                )}
                                key={message.id}
                            >
                                <div className='w-8 h-8 rounded-full bg-slate-400' />
                                <div className='w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md'>
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        ))}
                        {/*     <div className='flex items-start space-x-2'>
                            <div className='w-8 h-8 rounded-full bg-slate-400' />
                            <div className='w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md'>
                                <p>Hi how much are you selling them for?</p>
                            </div>
                        </div>
                        <div className='flex flex-row-reverse items-start space-x-2 space-x-reverse'>
                            <div className='w-8 h-8 rounded-full bg-slate-400' />
                            <div className='w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md'>
                                <p>I want ￦20,000</p>
                            </div>
                        </div> */}
                    </div>
                    <div className='fixed py-2 bg-white  bottom-0 inset-x-0'>
                        <form
                            onSubmit={handleSubmit(onValid)}
                            className='flex relative max-w-md items-center  w-full mx-auto'
                        >
                            <input
                                {...register("message", { required: true })}
                                type='text'
                                className='shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500'
                            />
                            <div className='absolute inset-y-0 flex py-1.5 pr-1.5 right-0'>
                                <button className='flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white'>
                                    &rarr;
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default StreamDetail;
