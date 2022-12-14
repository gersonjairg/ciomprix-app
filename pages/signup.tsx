import Image from 'next/image'

import SignupSvg from '/public/images/signup.svg'
import { Layout } from '@/components/templates'
import { MlSignupForm } from '@/components/molecules'
import type { SignUpFields } from '@/types/index'
import { useRouter } from 'next/router'
import { createUser } from '@/services/users'
import useAlert from 'hooks/useAlert'

export default function SignUp() {
  const { push: redirect } = useRouter()
  const { showErrorAlert, showSuccessAlert } = useAlert()

  async function signUp(data: SignUpFields) {
    const response = await createUser(data)
    if (!response?.data) {
      response.message && showErrorAlert(response.message)
      return
    }
    showSuccessAlert('Successful registration')
    redirect('/login')
  }

  return (
    <Layout theme="light" withoutFooter>
      <main className="h-screen pt-20 pb-10 mx-auto px-10 flex flex-col md:px-28 bg-gray-100">
        <div
          className={`flex justify-evenly w-full items-center flex-col lg:flex-row-reverse basis-full`}
        >
          <div className="flex items-center justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <Image alt="login-img" src={SignupSvg} fill />
            </div>
          </div>
          <div className="w-full sm:max-w-sm mx-5">
            <MlSignupForm signUp={signUp} />
          </div>
        </div>
      </main>
    </Layout>
  )
}
