import 'tailwindcss/tailwind.css'

export default function Confirm() {
  return (
    <main className="mt-12 lg:mt-32">
      <section className="container w-full max-w-md m-auto items-center">
        <form action="#" className="bg-gray-100 shadow-sm rounded-md p-8">
          <div className="mb-6">
            <label
              htmlFor="confirmation-code"
              className="mb-3 block text-gray-700"
            >
              Enter the emailed confirmation code:
            </label>
            <input
              type="text"
              id="confirmation-code"
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
      </section>
    </main>
  )
}
