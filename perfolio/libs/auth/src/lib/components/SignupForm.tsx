import Link from 'next/link';
import { LabeledTextField, Form, FORM_ERROR } from '@perfolio/components';
import { MailIcon, LockClosedIcon, UserIcon } from '@heroicons/react/outline';
import { z } from 'zod';
import { useAuth } from '../hooks/auth';
type SignupFormProps = {
  onSuccess?: () => void;
};

export const Signup = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(8).max(128),
});

export const SignupForm = (props: SignupFormProps) => {
  const { signup } = useAuth();
  return (
    <div>
      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: '', password: '' }}
        onSubmit={async ({ email, username, password }) => {
          try {
            await signup(email, username, password);
            props.onSuccess?.();
          } catch (error) {
            if (
              error.code === 'P2002' &&
              error.meta?.target?.includes('email')
            ) {
              // This error comes from Prisma
              return { email: 'This email is already being used' };
            } else {
              return { [FORM_ERROR]: error.toString() };
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" iconLeft={<MailIcon />} />
        <LabeledTextField
          name="username"
          label="Username"
          iconLeft={<UserIcon />}
        />
        <LabeledTextField
          name="password"
          label="Password"
          type="password"
          iconLeft={<LockClosedIcon />}
        />
      </Form>
      <div className="flex items-center justify-between mt-4 text-sm">
        <Link href="/auth/signin"> Sign in</Link>
        {/* <Link href={Routes.ForgotPasswordPage()}>
          <a>Forgot your password?</a>
        </Link> */}
      </div>
    </div>
  );
};

export default SignupForm;
