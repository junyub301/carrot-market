import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import Head from "next/head";
import useSWR, { SWRConfig } from "swr";
import { Product } from ".prisma/client";
import client from "@libs/server/client";

export interface ProductWidthCount extends Product {
    _count: {
        favs: number;
    };
}
interface ProductResponse {
    ok: boolean;
    products: ProductWidthCount[];
}

const Home: NextPage = () => {
    const { user, isLoading } = useUser();
    const { data } = useSWR<ProductResponse>("/api/products");
    return (
        <Layout title='홈' hasTabBar>
            <Head>
                <title>Home</title>
            </Head>
            <div className='flex flex-col space-y-5 py-10'>
                {data
                    ? data?.products?.map((product) => (
                          <Item
                              id={product.id}
                              key={product.id}
                              title={product.name}
                              price={product.price}
                              hearts={product._count?.favs || 0}
                          />
                      ))
                    : "Loading..."}
                <FloatingButton href={"/products/upload"}>
                    <svg
                        className='h-6 w-6'
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
                            d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                        />
                    </svg>
                </FloatingButton>
            </div>
        </Layout>
    );
};

const Page: NextPage<{ products: ProductWidthCount[] }> = ({ products }) => {
    return (
        <SWRConfig
            value={{
                // fallback: 캐시 초기값을 설정할 수 있다.
                fallback: {
                    "/api/products": {
                        ok: true,
                        products,
                    },
                },
            }}
        >
            <Home />
        </SWRConfig>
    );
};

export async function getServerSideProps() {
    console.log("SSR");

    const products = await client.product.findMany({});
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}

export default Page;
