import { Product, User, Chatroom } from ".prisma/client";
import Button from "@components/button";
import Layout from "@components/layout";
import useMutations from "@libs/client/useMutations";
import useUser from "@libs/client/useUser";
import { cls, imageSrc } from "@libs/client/utils";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";

interface ProductWidthUserAndChatRoom extends Product {
    user: User;
    chatrooms: Chatroom[];
}

interface ItemDetailResponse {
    ok: boolean;
    product: ProductWidthUserAndChatRoom;
    relatedProducts: Product[];
    isLiked: boolean;
}

interface createChatRoomMutation {
    ok: boolean;
    chatRoom: Chatroom;
}

const ItemDetail: NextPage = () => {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const { mutate } = useSWRConfig();
    const {
        data,
        mutate: boundMutate,
        isValidating,
    } = useSWR<ItemDetailResponse>(
        router.query.id ? `/api/products/${router.query.id}` : null
    );
    const [toggleFav] = useMutations(`/api/products/${router.query.id}/fav`);
    const [soldout] = useMutations(`/api/products/${router?.query?.id}`);
    const [createChatroom, { loading: chatRoomLoading, data: chatRoom }] =
        useMutations<createChatRoomMutation>("/api/chats");
    const onFavClick = () => {
        if (!data) return;
        boundMutate(
            (prev) => prev && { ...prev, isLiked: !prev.isLiked },
            false
        );
        // 다른 페이지의 값을 변경 하고 싶을 경우에는 useSWRConfig()의 mutate를 사용한다.
        // 단순히 refresh만 하고 싶을 경우에는 mutate("/api/users/me")이렇게만 사용한다.
        // mutate("/api/users/me", (pre: any) => ({ ok: !pre.ok }), false);
        toggleFav({});
    };

    const onSoldOut = () => {
        alert("판매완료 하시겠습니까?");
        boundMutate(
            (prev) =>
                prev && {
                    ...prev,
                    product: {
                        ...prev.product,
                        soldOut: true,
                    },
                },
            false
        );
        soldout({});
    };

    const onTalkClick = () => {
        if (!data) return;
        createChatroom({
            productId: data.product?.id,
            sellerId: data.product?.userId,
        });
        if (chatRoom) {
            router.push(`/chats/${chatRoom.chatRoom?.id}`);
        }
    };

    if (router.isFallback) {
        return (
            <Layout title='loading...'>
                <span>loading..</span>
            </Layout>
        );
    }

    return isValidating ? (
        <Layout title='loading...'>
            <span>loading..</span>
        </Layout>
    ) : (
        <Layout canGoBack seoTitle='Product Detail'>
            <div className='px-4 py-10'>
                <div className='mb-8'>
                    <div className='relative pb-80'>
                        <Image
                            src={imageSrc(data?.product?.image, "public")}
                            className=' bg-slate-300 object-corver'
                            layout='fill'
                            objectFit='cover'
                            alt='productImage'
                        />
                    </div>
                    <div className='flex  py-3 border-t border-b  items-center space-x-3'>
                        <Image
                            width={48}
                            height={48}
                            src={imageSrc(
                                data?.product?.user?.avatar,
                                "avatar"
                            )}
                            className='w-12 h-12 rounded-full bg-gray-300'
                            alt='avataImage'
                        />
                        <div>
                            <p className='text-sm font-medium text-gray-700'>
                                {data?.product?.user?.name}
                            </p>
                            <Link
                                href={`/users/profiles/${data?.product?.user?.id}`}
                            >
                                <a className='text-xs font-medium text-gray-500'>
                                    View profile &rarr;
                                </a>
                            </Link>
                        </div>
                        {data?.product?.user?.id === user?.id &&
                            !data?.product?.soldOut && (
                                <div className='flex flex-1 justify-end'>
                                    <button onClick={onSoldOut}>
                                        판매완료
                                    </button>
                                </div>
                            )}
                    </div>
                    <div className='mt-5'>
                        <h1 className='text-3xl font-bold text-gray-900'>
                            {data?.product?.name}
                        </h1>
                        <span
                            className={cls(
                                "text-2xl mt-3 block ",
                                data?.product?.soldOut
                                    ? "text-gray-500"
                                    : "text-gray-900"
                            )}
                        >
                            $
                            {data?.product?.soldOut
                                ? "판매완료"
                                : data?.product?.price}
                        </span>
                        <p className=' my-6 text-gray-700'>
                            {data?.product?.description}
                        </p>
                        {user?.id !== data?.product?.userId && (
                            <div className='flex items-center justify-between space-x-2'>
                                <Button
                                    text='Talk to seller'
                                    large
                                    onClick={onTalkClick}
                                />

                                <button
                                    onClick={onFavClick}
                                    className={cls(
                                        "p-3 rounded-md flex items-center hover:bg-gray-100  justify-center ",
                                        data?.isLiked
                                            ? "text-red-400  hover:text-red-600"
                                            : "text-gray-400 hover:text-gray-500"
                                    )}
                                >
                                    {data?.isLiked ? (
                                        <svg
                                            className='w-6 h-6'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                                                clipRule='evenodd'
                                            ></path>
                                        </svg>
                                    ) : (
                                        <svg
                                            className='h-6 w-6 '
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                            aria-hidden='true'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-gray-900'>
                        Similar items
                    </h2>
                    <div className='mt-6 grid grid-cols-2 gap-4'>
                        {data?.relatedProducts?.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                            >
                                <a>
                                    <div className='h-56 w-full mb-4 bg-slate-300' />
                                    <h3 className=' text-gray-700 -mb-1'>
                                        {product.name}
                                    </h3>
                                    <span className='text-sm font-medium text-gray-900'>
                                        ${product.price}
                                    </span>
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ItemDetail;
