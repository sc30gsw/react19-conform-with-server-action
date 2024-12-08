'use client'

import '@/utils/zod-error-map-utils'
import {
  Button,
  Card,
  Checkbox,
  Form,
  Radio,
  RadioGroup,
  TextField,
} from '@/components/ui'
import { signUp } from '@/features/auth/actions/sign-up'
import { signUpSchema } from '@/types/sign-up-schema'
import {
  getCollectionProps,
  getFormProps,
  getInputProps,
  useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { useActionState } from 'react'

export const SignUpCard = () => {
  // https://ja.react.dev/reference/react/useActionState
  const [lastResult, action, isPending] = useActionState(signUp, null)

  // https://conform.guide/integration/nextjs
  const [form, fields] = useForm({
    constraint: getZodConstraint(signUpSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signUpSchema })
    },
  })

  return (
    <Card className="max-w-md mx-auto">
      <Card.Header>
        <Card.Title>Sign Up</Card.Title>
        <Card.Description>Create your account to get started.</Card.Description>
      </Card.Header>
      <Form {...getFormProps(form)} action={action}>
        <Card.Content className="space-y-4">
          <div>
            <TextField
              {...getInputProps(fields.email, { type: 'email' })}
              placeholder="Enter your email"
              isDisabled={isPending}
              label="Email"
              errorMessage={''}
            />
            <ErrorMessage
              errorId={fields.email.errorId}
              errors={fields.email.errors}
            />
          </div>
          <div>
            <TextField
              {...getInputProps(fields.password, { type: 'password' })}
              label="Password"
              isRevealable={true}
              placeholder="Enter your password"
              isDisabled={isPending}
              errorMessage={''}
            />
            <ErrorMessage
              errorId={fields.password.errorId}
              errors={fields.password.errors}
            />
          </div>
          <div>
            <TextField
              {...getInputProps(fields.age, { type: 'number' })}
              label="Age"
              placeholder="Enter your age"
              isDisabled={isPending}
              errorMessage={''}
            />
            <ErrorMessage
              errorId={fields.age.errorId}
              errors={fields.age.errors}
            />
          </div>
          <div>
            {/* https://zenn.dev/coji/articles/conform-shadcn-ui-radiogroup */}
            <RadioGroup
              label="Gender"
              name={fields.gender.name}
              value={fields.gender.value}
              defaultValue={'other'}
              onChange={(value) => {
                form.update({
                  name: fields.gender.name,
                  value,
                })
              }}
            >
              {getCollectionProps(fields.gender, {
                type: 'radio',
                options: ['male', 'female', 'other'],
              }).map((props) => (
                <Radio
                  key={props.id}
                  value={props.value}
                  isDisabled={isPending}
                >
                  {props.value}
                </Radio>
              ))}
            </RadioGroup>
            <ErrorMessage
              errorId={fields.gender.errorId}
              errors={fields.gender.errors}
            />
          </div>
          <div className="flex justify-between items-center">
            {getCollectionProps(fields.isAgree, {
              type: 'checkbox',
              options: ['on'],
            }).map((props) => (
              <Checkbox
                key={props.id}
                name={fields.isAgree.name}
                isSelected={props.value === fields.isAgree.value}
                onChange={(checked) => {
                  form.update({
                    name: fields.isAgree.name,
                    value: checked ? 'on' : 'off',
                  })
                }}
                value={props.value}
                isDisabled={isPending}
              >
                I agree to the terms and conditions
                {props.value}
              </Checkbox>
            ))}
            <ErrorMessage
              errorId={fields.isAgree.errorId}
              errors={fields.isAgree.errors}
            />
          </div>
        </Card.Content>
        <Card.Footer>
          <Button type="submit" className="w-full" isDisabled={isPending}>
            Sign Up
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}

type ErrorMessageProps = {
  errorId: string
  errors?: string[]
}

const ErrorMessage = ({ errorId, errors }: ErrorMessageProps) => {
  return (
    <div id={errorId} className="mt-1 text-sm text-red-500">
      {errors}
    </div>
  )
}
