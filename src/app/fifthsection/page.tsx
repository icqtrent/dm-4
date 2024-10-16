import { NextPage } from 'next';

interface FifthSectionProps {
  id?: string;
}

const FifthSection: NextPage<FifthSectionProps> = ({ id }) => {
  return (
    <section id={id} className="flex flex-col md:flex-row justify-center">
      <div className="border-[1px] md:w-2/3 mx-auto p-10 rounded-xl">
        <div className="text-4xl font-bold mb-5">
          Start building your online store today.
        </div>
        <div>
          Curious about how Bird can help your business? Get in touch with our
          team to learn more about our platform and how we can help you grow
          your business.
        </div>

        <button
          aria-label="contact sales button"
          className="bg-blue-500 text-white px-6 py-3 md:w-1/4 mt-5 rounded-lg"
        >
          Contact Sales
        </button>
      </div>
    </section>
  );
};

export default FifthSection;

