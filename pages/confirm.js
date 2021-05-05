import { useState } from 'react'

import 'tailwindcss/tailwind.css'

export default function Confirm() {
  // I wish I could build a state machine here ;)
  const [code, setCode] = useState('unknown')

  const checkConfirmationCode = (event) => {
    event.preventDefault()

    if (event.target.confirmation_code.value === '654agc') {
      setCode('confirmed')
    } else {
      setCode('wrong')
    }
  }

  const IncorrectCode = () => (
    <div
      data-cy="incorrect-code"
      className="text-center py-3 px-12 bg-red-400 mt-5 mr-5 rounded-md text-white text-lg focus:outline-none w-full"
    >
      Incorrect confirmation code
    </div>
  )

  const ConfirmedCode = () => (
    <div
      data-cy="confirmed-code"
      className="text-center py-3 px-12 bg-blue-400 mt-5 mr-5 rounded-md text-white text-lg focus:outline-none w-full"
    >
      Valid confirmation code 🎉
    </div>
  )

  return (
    <main className="mt-12 lg:mt-32">
      <section className="container w-full max-w-md m-auto items-center">
        <form
          onSubmit={checkConfirmationCode}
          className="bg-gray-100 shadow-sm rounded-md p-8"
        >
          <div className="mb-6">
            <label
              htmlFor="confirmation_code"
              className="mb-3 block text-gray-700"
            >
              Enter the emailed confirmation code:
            </label>
            <input
              type="text"
              id="confirmation_code"
              className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full"
              placeholder="abc123"
              required
            />
          </div>
          <button
            type="submit"
            className="py-3 px-12 bg-green-300 hover:bg-green-600 mr-5 rounded-md text-white text-lg focus:outline-none w-full"
          >
            Confirm
          </button>
        </form>

        {code === 'confirmed' && <ConfirmedCode />}

        {code === 'wrong' && <IncorrectCode />}
      </section>
    </main>
  )
}
