import React from 'react';
import { injectReducer } from '@/store';
import { Textarea } from '@/components/ui';
import reducer from './store';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setComment, resetComment } from './store/stateSlice';

injectReducer("reviewComment", reducer);

export interface ReviewCommentRef {
    getComment: () => string;
    setCommentManually: (value: string) => void;
    clearComment: () => void;
}

const ReviewComment = React.forwardRef<ReviewCommentRef>((_, ref) => {
    const dispatch = useAppDispatch();
    const { text } = useAppSelector((state) => state.reviewComment.state);

    const handleChangeText = React.useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(setComment(e.target.value));
        },
        [dispatch]
    );

    React.useImperativeHandle(
        ref,
        () => ({
            getComment: () => text,
            setCommentManually: (value: string) => dispatch(setComment(value)),
            clearComment: () => dispatch(resetComment())
        }),
        [text, dispatch]
    );


    return (
        <Textarea
            placeholder="Write your review here..."
            value={text}
            onChange={handleChangeText}
            className="w-full border rounded-md p-3"
        />
    );
});

export default React.memo(ReviewComment);
