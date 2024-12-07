'use client'

import { Button, Card, Checkbox, TextField } from '@/components/ui'

export const SignUpCard = () => {
  return (
    <Card className="max-w-md mx-auto">
      <Card.Header>
        <Card.Title>Login</Card.Title>
        <Card.Description>
          Don't loose the level, just keep on going.
        </Card.Description>
      </Card.Header>
      <Card.Content className="space-y-6">
        <TextField
          isRequired={true}
          label="Email"
          placeholder="Enter your email"
        />
        <TextField
          isRequired={true}
          label="Password"
          isRevealable={true}
          type="password"
          placeholder="Enter your password"
        />
        <div className="flex justify-between items-center">
          <Checkbox>Remember me</Checkbox>
        </div>
      </Card.Content>
      <Card.Footer>
        <Button className="w-full">Login</Button>
      </Card.Footer>
    </Card>
  )
}
