import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

type Props = {
    question: string;
    answers: string[]
    callback: any;
    userAnswer: any;
    questionNumber: number;
    totalQuestions: number;
    buttonsState: boolean
}

const useStyles = makeStyles({
    main: {
        margin: 'auto'
    },
    root: {
        // minWidth: 275,
        maxWidth: 400,
        margin: 'auto'
    },
    answers: {
        display: 'block'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNumber, totalQuestions, buttonsState }) => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant='h6' gutterBottom>
                        Question: {questionNumber + 1} / {totalQuestions}
                    </Typography>
                    <Typography variant='h5' gutterBottom>
                        {question}
                    </Typography>
                </CardContent>
                {answers.map((answer, index) => (
                    <CardActions key={index} className={classes.answers}>
                        <div>
                            <Button disabled={buttonsState} onClick={callback} variant='contained' fullWidth>{answer}</Button>
                        </div>
                    </CardActions>
                ))}
            </Card>

        </div>
    )
}
