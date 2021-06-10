import Link from 'next/link';
import { LabeledField, Form, FORM_ERROR } from '@perfolio/components';

import { z } from 'zod';
import { LockClosedIcon, MailIcon } from '@heroicons/react/outline';
import { useAuth } from '../hooks/auth';
type SigninFormProps = {
  onSuccess?: () => void;
};
export const Signin = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});
export const SigninForm = (props: SigninFormProps) => {
  const { signin } = useAuth();
  return (
    <div>
      <Form
        submitText="Signin"
        schema={Signin}
        initialValues={{ email: '', password: '' }}
        onSubmit={async ({ email, password }) => {
          try {
            console.log('Hello');
            await signin(email, password);
            props.onSuccess?.();
          } catch (error) {
            return {
              [FORM_ERROR]:
                'Sorry, we had an unexpected error. Please try again. - ' +
                error.toString(),
            };
          }
          return;
        }}
      >
        <LabeledField name="email" label="Email" iconLeft={<MailIcon />} />
        <LabeledField
          name="password"
          label="Password"
          type="password"
          iconLeft={<LockClosedIcon />}
        />
      </Form>

      <div className="flex items-center justify-between mt-4 text-sm">
        <Link href="/auth/signup"> Sign Up</Link>
        {/* <Link href={Routes.ForgotPasswordPage()}>
          <a>Forgot your password?</a>
        </Link> */}
      </div>
    </div>
  );
};

export default SigninForm;
