import { NextPage } from "next";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { cls } from "@libs/client/utils";
import { useForm } from "react-hook-form";
import useMutations from "@libs/client/useMutations";
import messages from "pages/api/streams/[id]/messages";
import Image from "next/image";

interface ChatResponse {
    ok: boolean;
    messages: ProductMessage[];
}

interface ProductMessage {
    message: string;
    id: number;
    user: {
        avatar?: string;
        id: number;
    };
}

interface MessageForm {
    message: string;
}

const ChatDetail: NextPage = () => {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const { data, mutate } = useSWR<ChatResponse>(
        router?.query?.id ? `/api/chats/${router.query.id}` : null,
        {
            refreshInterval: 1000,
        }
    );
    const { register, handleSubmit, reset } = useForm<MessageForm>();
    const [sendMessage, { loading, data: sendMessageData }] = useMutations(
        `/api/chats/${router?.query?.id}`
    );

    const onValid = (form: MessageForm) => {
        if (loading) return;
        reset();
        mutate(
            (prev) =>
                prev &&
                ({
                    prev,
                    messages: [
                        ...prev.messages,
                        {
                            id: Date.now(),
                            message: form.message,
                            user: { ...user },
                        },
                    ],
                } as any),
            false
        );
        sendMessage(form);
    };
    return (
        <Layout canGoBack>
            <div className="py-10 px-4 space-y-4">
                {data?.messages?.map((message) => {
                    let avatar = user?.id === message.user.id ? user?.avatar : message.user.avatar;
                    avatar = avatar ? avatar : "a95c472a-0aae-4100-9700-1258c8df5600";
                    return (
                        <div
                            className={cls(
                                "flex items-start space-x-2 ",
                                message.user.id === user?.id
                                    ? "space-x-reverse flex-row-reverse"
                                    : ""
                            )}
                            key={message.id}
                        >
                            <div className="w-10 h-10 relative rounded-full">
                                <Image
                                    src={`https://imagedelivery.net/p0F9ZS4dCd2hN10Ig7VfWg/${avatar}/avatar`}
                                    alt="userAvatar"
                                    layout="fill"
                                    className="rounded-full w-12 h-12"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                                <p>{message.message}</p>
                            </div>
                        </div>
                    );
                })}

                <div className="fixed w-full mx-auto max-w-md bottom-2 inset-x-0">
                    <form onSubmit={handleSubmit(onValid)} className="flex relative items-center">
                        <input
                            type="text"
                            {...register("message")}
                            className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none focus:border-orange-500 pr-12"
                        />
                        <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                            <button className="flex items-center bg-orange-500 rounded-full px-3 text-sm text-white hover:bg-orange-600  cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                &rarr;
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ChatDetail;
