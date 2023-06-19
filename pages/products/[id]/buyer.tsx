import Button from "@components/button";
import Layout from "@components/layout";
import useMutations from "@libs/client/useMutations";
import { cls, imageSrc } from "@libs/client/utils";
import { Chatroom, Product, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

interface ChatroomWidthUser extends Chatroom {
    buyer: User;
}

interface ProductWidthChatRoom extends Product {
    chatrooms: ChatroomWidthUser[];
}

interface ProductResponse {
    ok: boolean;
    product: ProductWidthChatRoom;
}

const Buyer = () => {
    const router = useRouter();
    const { data, mutate: boundMutate } = useSWR<ProductResponse>(
        router.query.id ? `/api/products/${router.query.id}` : null
    );
    const [sellingProducts] = useMutations(`/api/products/${router.query.id}`);

    const [selectUser, setSelectuser] = useState<number>(0);

    const onSelectUser = (buyer: User) => {
        setSelectuser(buyer.id);
    };

    const onSubmit = () => {
        sellingProducts({ buyerId: selectUser });
        router.push("/");
    };

    return (
        <Layout canGoBack title="구매자 선택">
            {data && (
                <div className=" flex flex-col min-h-[50vh] gap-3 ">
                    <div className="flex p-2 bg-gray-200  space-x-2 gap-3">
                        <div className="w-16 h-16 relative object-cover">
                            <Image
                                className="rounded-md object-cover "
                                src={imageSrc(data?.product?.image, "public")}
                                alt="productImage"
                                layout="fill"
                            />
                        </div>
                        <div className="flex flex-col  space-y-2 gap-1">
                            <span className="text-gray-400">거래한 물건</span>
                            <span>{data?.product?.name}</span>
                        </div>
                    </div>
                    <div className="flex flex-col  divide-y-[1px]">
                        {data.product?.chatrooms?.map((chatroom) => (
                            <div
                                key={chatroom.buyer?.id}
                                onClick={() => onSelectUser(chatroom.buyer)}
                                className={cls(
                                    "flex gap-3  cursor-pointer p-3",
                                    selectUser === chatroom.buyer.id ? "bg-slate-300" : ""
                                )}
                            >
                                <div className="w-10 h-10 relative ">
                                    <Image
                                        className="rounded-full  object-cover"
                                        src={imageSrc(chatroom.buyer?.avatar, "avatar")}
                                        alt="userAvatar"
                                        layout="fill"
                                    />
                                </div>
                                <div>
                                    <span>{chatroom.buyer?.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-auto">
                        <Button
                            onClick={onSubmit}
                            className="fixed bottom-0"
                            text="확정하기"
                            disabled={!data.product?.chatrooms[0]?.buyer}
                        />
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Buyer;
