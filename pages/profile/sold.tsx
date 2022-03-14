import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR from "swr";
import { Product, Sale } from ".prisma/client";
import { ProductWidthCount } from "pages";
import ProductList from "@components/product-list";

const Sold: NextPage = () => {
    return (
        <Layout canGoBack title='판매내역'>
            <div className='flex flex-col space-y-5 py-10'>
                <ProductList kind='sales' />
            </div>
        </Layout>
    );
};

export default Sold;
