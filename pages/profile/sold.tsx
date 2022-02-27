import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";

const Sold: NextPage = () => {
    return (
        <Layout canGoBack title='구매내역'>
            <div className='flex flex-col space-y-5 py-10'>
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                    <Item
                        id={i}
                        key={i}
                        title='iPhone 14'
                        price={99}
                        comments={1}
                        hearts={1}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Sold;
