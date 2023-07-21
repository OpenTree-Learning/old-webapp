import { getQuestions } from '../../../utils/questions'
import Question from './question'
import * as types from '../../../types/question'


export async function preloadQuestions () {
  void await getQuestions()
}

export default async function QuestionPage({ params }: { params: { slug: string } }) {

  const [ questionId ] = params.slug
  const questions: types.QuestionResponse = await getQuestions()
  console.log('questions:', questions.data)
  const question: types.Question = questions.data
    .find((q: types.Question) => q.questionId === questionId) as types.Question

  if (!question) {
    throw new Error(`La question "${questionId}" n'existe pas.`)
  }

  return (
    <Question question={question}/>
  )
}
