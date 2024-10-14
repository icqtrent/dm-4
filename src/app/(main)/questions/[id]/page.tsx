// app/pregunta/[id]/page.tsx
import QuestionPageContent from '@/components/QuestionPageContent'

export default function QuestionPage({ params }: { params: { id: string } }) {
  return <QuestionPageContent id={params.id} />
}