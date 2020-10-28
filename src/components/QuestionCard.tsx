import React from 'react'
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
        margin: 'auto',
        backgroundColor: '#8db596',
        borderRadius: '20px'
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
    button: {
        backgroundColor: '#92817a',
        borderRadius: '10px',
        '&:hover': {
            backgroundColor: '#9b817d'
        }
    },
    greenButton: {
        backgroundColor: '#158467',
        borderRadius: '10px',
        '&:hover': {
            backgroundColor: '#158411'
        }
    },
    redButton: {
        backgroundColor: '#d54062',
        borderRadius: '10px',
        '&:hover': {
            backgroundColor: '#d54022'
        }
    }

});



export const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNumber, totalQuestions, buttonsState }) => {
    const classes = useStyles();
    const buttonClass = (disabled: boolean, currentAnswer: string) => {
        if (disabled) {
            const correctAnswer = userAnswer.correctAnswer
            const selectedAnswer = userAnswer.selectedAnswer
            if (currentAnswer === correctAnswer) {
                return classes.greenButton
            }
            if (currentAnswer === selectedAnswer) {
                return classes.redButton
            }
        }
        return classes.button
    }
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
                            <Button className={buttonClass(buttonsState, answer)} onClick={!buttonsState ? callback : () => { }} variant='contained' fullWidth>{answer}</Button>
                        </div>
                    </CardActions>
                ))}
            </Card>

        </div>
    )
}
