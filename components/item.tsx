import { cls, moneyFormat } from "@libs/client/utils";
import Image from "next/image";
import Link from "next/link";

interface ItemProps {
    title: string;
    id: number;
    price: number;
    hearts: number;
    image: string;
    soldOut?: boolean;
}

export default function Item({
    title,
    price,
    hearts,
    id,
    image,
    soldOut,
}: ItemProps) {
    return (
        <Link href={`/products/${id}`}>
            <a className='flex px-4 pt-5 cursor-pointer justify-between'>
                <div className='flex space-x-4'>
                    <div className='w-20 h-20  rounded-md relative'>
                        <Image
                            src={`https://imagedelivery.net/p0F9ZS4dCd2hN10Ig7VfWg/${image}/public`}
                            className=' w-20 h-20 rounded-md object-cover'
                            layout='fill'
                            alt=''
                        />
                    </div>
                    <div className='pt-2 flex flex-col'>
                        <h3 className='text-sm font-medium text-gray-900'>
                            {title}
                        </h3>
                        <span
                            className={cls(
                                "font-medium mt-1 ",
                                soldOut ? "text-gray-500" : "text-gray-900"
                            )}
                        >
                            {soldOut ? "판매완료" : `$${moneyFormat(price)}`}
                        </span>
                    </div>
                </div>
                <div className='flex space-x-2 items-end justify-end'>
                    <div className='flex space-x-0.5 items-center text-sm  text-gray-600'>
                        <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                            ></path>
                        </svg>
                        <span>{hearts}</span>
                    </div>
                </div>
            </a>
        </Link>
    );
}
