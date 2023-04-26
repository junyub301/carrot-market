import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import useSWR from "swr";
import { Chatroom, Message, User } from "@prisma/client";
import Image from "next/image";
import useUser from "@libs/client/useUser";

interface ChatsResponse {
    ok: boolean;
    chatRooms: ProductWidthUserAndChatRoom[];
}

interface ProductWidthUserAndChatRoom extends Chatroom {
    buyer: User;
    seller: User;
    messages: Message[];
}

const Chats: NextPage = () => {
    const { data } = useSWR<ChatsResponse>("/api/chats");
    const { user } = useUser();
    return (
        <Layout title="채팅" hasTabBar>
            <div className="py-10 divide-y-[1px]">
                {data?.chatRooms?.map((chatRoom) => {
                    let avatar =
                        user?.id === chatRoom.buyerId
                            ? chatRoom.seller.avatar
                            : chatRoom.buyer?.avatar;
                    avatar = avatar ? avatar : "a95c472a-0aae-4100-9700-1258c8df5600";
                    return (
                        <Link href={`/chats/${chatRoom.id}`} key={chatRoom.id}>
                            <a className="flex  px-4 cursor-pointer py-3  items-center space-x-3">
                                <div className="w-10 h-10 relative rounded-full bg-gray-300">
                                    <Image
                                        src={`https://imagedelivery.net/p0F9ZS4dCd2hN10Ig7VfWg/${avatar}/avatar`}
                                        alt="userAvatar"
                                        layout="fill"
                                        className="rounded-full w-12 h-12"
                                        objectFit="cover"
                                    />
                                </div>

                                <div>
                                    <p className=" text-gray-700">{chatRoom.buyer?.name}</p>
                                    <p className="text-sm font-medium text-gray-500">
                                        {chatRoom.messages[0]?.message}
                                    </p>
                                </div>
                            </a>
                        </Link>
                    );
                })}
            </div>
        </Layout>
    );
};

export default Chats;
