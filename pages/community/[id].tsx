import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import Textarea from "@components/textarea";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Answer, Post, User } from ".prisma/client";
import Link from "next/link";
import useMutations from "@libs/client/useMutations";
import { cls, dateFormat } from "@libs/client/utils";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import useUser from "@libs/client/useUser";
import useDelete from "@libs/client/useDelete";

interface AnswerWithUser extends Answer {
    user: User;
}

interface PostWithUser extends Post {
    user: User;
    _count: {
        answers: number;
        wonderings: number;
    };
    answers: AnswerWithUser[];
}

interface CommunityPostResponse {
    ok: boolean;
    post: PostWithUser;
    isWondering: boolean;
}

interface AnswerForm {
    answer: string;
}

interface AnswerResponse {
    ok: boolean;
    answer: Answer;
}

const CommunityPostDetail: NextPage = () => {
    const { user } = useUser();
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<AnswerForm>();
    const { data, mutate } = useSWR<CommunityPostResponse>(
        router.query.id ? `/api/posts/${router.query.id}` : null
    );
    const [wonder, { loading }] = useMutations(
        `/api/posts/${router.query.id}/wonder`
    );
    const [snedAnswer, { loading: answerLoading, data: answerData }] =
        useMutations<AnswerResponse>(`/api/posts/${router.query.id}/answers`);

    const [deleteAnswer, { data: deleteAnswerData }] =
        useDelete<AnswerResponse>(`/api/posts/${router.query.id}/answers`);

    const onWonderClick = () => {
        if (!data) return;
        mutate(
            (prev) =>
                prev && {
                    ...prev,
                    post: {
                        ...prev.post,
                        _count: {
                            ...prev.post._count,
                            wonderings: prev.isWondering
                                ? prev?.post._count.wonderings - 1
                                : prev?.post._count.wonderings + 1,
                        },
                    },
                    isWondering: !prev.isWondering,
                },
            false
        );
        if (!loading) {
            wonder({});
        }
    };
    const onValid = (form: AnswerForm) => {
        if (answerLoading) return;
        snedAnswer(form);
    };

    const onAnswerDelete = (answerId: number) => {
        alert("정말 삭제하시겠습니까?");
        deleteAnswer({ answerId });
    };

    useEffect(() => {
        if (answerData && answerData.ok) {
            reset();
            mutate();
        }
    }, [answerData, reset, mutate]);

    useEffect(() => {
        if (deleteAnswerData && deleteAnswerData.ok) {
            reset();
            mutate();
        }
    }, [deleteAnswerData, reset, mutate]);

    return (
        <Layout canGoBack>
            <div>
                <span className='inline-flex items-center my-3 ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-900'>
                    동네질문
                </span>
                <div className='flex mb-3 px-4 cursor-pointer py-3  border-b  items-center space-x-3'>
                    <div className='w-10 h-10 rounded-full bg-gray-300' />
                    <div>
                        <p className='text-sm font-medium text-gray-700'>
                            {data?.post?.user?.name}
                        </p>
                        <Link href={`/users/profiles/${data?.post?.user?.id}`}>
                            <a className='text-xs font-medium text-gray-500'>
                                View profile &rarr;
                            </a>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className='mt-2 px-4 text-gray-700'>
                        <span className='text-orange-500 font-medium'>Q.</span>
                        {data?.post?.question}
                    </div>
                </div>
                <div className='flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px] w-full'>
                    <button
                        onClick={onWonderClick}
                        className={cls(
                            "flex space-x-2 items-center text-sm",
                            data?.isWondering ? "text-teal-400" : ""
                        )}
                    >
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
                                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            ></path>
                        </svg>
                        <span>궁금해요 {data?.post?._count?.wonderings}</span>
                    </button>
                    <span className='flex space-x-2 items-center text-sm'>
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
                                d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                            ></path>
                        </svg>
                        <span>답변 {data?.post?._count?.answers}</span>
                    </span>
                </div>
                <div className='px-4 my-5 space-y-5'>
                    {data?.post?.answers?.map((answer) => (
                        <div
                            key={answer.id}
                            className='flex items-start space-x-3'
                        >
                            <div className='w-8 h-8 bg-slate-200 rounded-full' />
                            <div>
                                <span className='text-sm block font-medium text-gray-700 '>
                                    {answer.user.name}
                                </span>
                                <span className='text-xs block  text-gray-500'>
                                    {dateFormat(answer.createdAt)}
                                </span>
                                <p className='atext-gray-700 mt-2'>
                                    {answer.answer}
                                </p>
                            </div>
                            {answer.user.id === user?.id && (
                                <div
                                    onClick={() => onAnswerDelete(answer.id)}
                                    className='flex flex-1 flex-row justify-end items-end cursor-pointer'
                                >
                                    x
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <form className='px-4' onSubmit={handleSubmit(onValid)}>
                    <Textarea
                        register={register("answer", {
                            required: true,
                            minLength: 1,
                        })}
                        placeholder='Answer this question'
                    />

                    <Button text={answerLoading ? "Loading... " : "Reply"} />
                </form>
            </div>
        </Layout>
    );
};

export default CommunityPostDetail;
