import type { NextPage } from "next";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";
import Textarea from "../../components/textarea";

const Create: NextPage = () => {
    return (
        <Layout canGoBack>
            <form className='py-10 px-4 space-y-5'>
                <Input required label='Name' name='name' type='name' />
                <Input
                    required
                    label='Price'
                    name='price'
                    placeholder='0.00'
                    type='text'
                    kind='price'
                />

                <Textarea label='Description' name='description' />
                <Button text='Go live' />
            </form>
        </Layout>
    );
};

export default Create;
