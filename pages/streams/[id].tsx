import type { NextPage } from "next";
import Layout from "@components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Stream } from ".prisma/client";
import { useForm } from "react-hook-form";
import useMutations from "@libs/client/useMutations";
import useUser from "@libs/client/useUser";
import { useEffect } from "react";
import Message from "@components/message";

interface StreamMessage {
    message: string;
    id: number;
    user: {
        avatar?: string;
        id: number;
    };
}

interface StreamWithMessage extends Stream {
    chatroom: [
        {
            messages: StreamMessage[];
        }
    ];
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
        router?.query?.id ? `/api/streams/${router.query.id}` : null,
        {
            refreshInterval: 1000,
        }
    );
    const [sendMessage, { loading, data: sendMessageData }] = useMutations(
        `/api/streams/${router.query.id}/messages`
    );
    const onValid = (form: MessageForm) => {
        if (loading) return;
        reset();
        mutate(
            (prev) =>
                prev &&
                ({
                    prev,
                    stream: {
                        ...prev.stream,
                        chatroom: [
                            {
                                messages: [
                                    ...prev.stream.chatroom[0]?.messages,
                                    {
                                        id: Date.now(),
                                        message: form.message,
                                        user: { ...user },
                                    },
                                ],
                            },
                        ],
                    },
                } as any),
            false
        );

        sendMessage(form);
    };

    return (
        <Layout canGoBack>
            <div className='py-10 px-4  space-y-4'>
                {data?.stream.cloudflareId ? (
                    <iframe
                        className='w-full aspect-video rounded-md shadow-sm'
                        src={`https://iframe.videodelivery.net/${data?.stream.cloudflareId}`}
                        allow='accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;'
                        allowFullScreen={true}
                    ></iframe>
                ) : null}
                {/*   <div className='mt-5'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        {data?.stream?.name}
                    </h1>
                    <span className='text-2xl block mt-3 text-gray-900'>
                        ${data?.stream?.price}
                    </span>
                    <p className=' my-6 text-gray-700'>
                        {data?.stream?.description}
                    </p>
                    <div className='bg-orange-300 p-5 rounded-md overflow-scroll flex flex-col space-y-3'>
                        <span>Stream Keys (secret)</span>
                        <span className='text-gray-600'>
                            <span className='font-medium text-gray-800'>
                                URL
                            </span>
                            :{data?.stream.cloudflareUrl}
                        </span>
                        <span className='text-gray-600'>
                            <span className='font-medium text-gray-800'>
                                Key
                            </span>
                            :{data?.stream.cloudflareKey}
                        </span>
                    </div>
                </div> */}
                <div>
                    <h2 className='text-2xl font-bold text-gray-900'>
                        Live Chat
                    </h2>
                    <div className='py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4'>
                        {data?.stream.chatroom[0]?.messages?.map((message) => (
                            <Message
                                reverse={message.user.id === user?.id}
                                message={message.message}
                                key={message.id}
                            />
                        ))}
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
