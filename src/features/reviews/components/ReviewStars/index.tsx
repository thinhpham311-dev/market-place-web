import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setRating, resetRating } from './store/stateSlice';
import reducer from "./store";
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';
import { injectReducer } from '@/store';


interface ReviewStarsProps {
    readOnly?: boolean;
    data?: number;
}

export interface ReviewStarsRef {
    getRating: () => number;
    setRatingManually: (value: number) => void;
    resetRating: () => void;
}

injectReducer("reviewRating", reducer);

const ReviewStars = React.forwardRef<ReviewStarsRef, ReviewStarsProps>(
    ({ data = 0, readOnly = false }, ref) => {
        const dispatch = useAppDispatch();
        const { rating } = useAppSelector(state => state.reviewRating.state);

        const handleClick = React.useCallback(
            (index: number) => {
                if (!readOnly) {
                    dispatch(setRating(index + 1));
                }
            },
            [dispatch, readOnly]
        );

        const activeRating = readOnly ? data : rating;

        // ✅ Expose methods to parent
        React.useImperativeHandle(ref, () => ({
            getRating: () => activeRating,
            setRatingManually: (value: number) => {
                if (!readOnly) {
                    dispatch(setRating(value));
                }
            },
            resetRating: () => {
                if (!readOnly) {
                    dispatch(resetRating());
                }
            }
        }), [activeRating, dispatch, readOnly]);

        return (
            <Card className="border-none shadow-none">
                <CardContent className="p-3">
                    <div className="flex space-x-1">
                        {[...Array(5)].map((_, index) => {
                            const isActive = index < activeRating;
                            return (
                                <span
                                    key={index}
                                    className={`cursor-pointer ${readOnly ? '' : 'hover:text-yellow-500'}`}
                                    onClick={() => handleClick(index)}
                                >
                                    {isActive ? (
                                        <MdOutlineStar size={20} className="text-yellow-500" />
                                    ) : (
                                        <MdOutlineStarBorder size={20} className="text-gray-400" />
                                    )}
                                </span>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        );
    }
);

export default React.memo(ReviewStars);
