import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          redirectUrl="/dashboard"
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: '#000000',
              colorBackground: '#ffffff',
              colorInputBackground: '#f8f9fa',
              colorInputText: '#000000',
            },
            elements: {
              formButtonPrimary: 'bg-black hover:bg-gray-800 text-white',
              card: 'shadow-lg border border-gray-200',
              headerTitle: 'text-black',
              headerSubtitle: 'text-gray-600',
            },
          }}
        />
      </div>
    </div>
  )
}
