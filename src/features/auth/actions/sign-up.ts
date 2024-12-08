'use server'

import { signUpSchema } from '@/types/sign-up-schema'
import { parseWithZod } from '@conform-to/zod'
import { redirect } from 'next/navigation'

// https://conform.guide/integration/nextjs
// biome-ignore lint/suspicious/useAwait: this is a server action
// biome-ignore lint/correctness/noUnusedFunctionParameters: this code is a sample
// biome-ignore lint/correctness/noUnusedVariables: this code is a sample
export const signUp = async (prevState: unknown, formData: FormData) => {
  // https://conform.guide/api/zod/parseWithZod
  // formDataをzodのスキーマと照合
  const submission = parseWithZod(formData, { schema: signUpSchema })
  console.log('🚀 ~ signUp ~ submission:', submission)

  if (submission.status !== 'success') {
    return submission.reply()
  }

  redirect('/')
}
