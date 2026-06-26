import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);

    formData.append("access_key", "987bca8d-dd54-4d19-8836-2bcf68981cea");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      toast.success("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message);
      setResult("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-center p-6 py-20 lg:px-3 w-full overflow-hidden"
      id="Contact"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Contact
        <span className="underline underline-offset-4 decoration-1 font-light ml-2">
          With Us
        </span>
      </h1>

      <p className="text-center text-gray-500 mb-2 max-w-80 mx-auto">
        Ready to Make? Let's Build Your Future Together
      </p>

      <form
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto text-gray-600 pt-8"
      >
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 text-left">
            <label className="block mb-2">Your Name</label>

            <input
              className="w-full border border-gray-300 rounded py-3 px-4"
              type="text"
              name="Name"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="w-full md:w-1/2 text-left md:pl-4 mt-4 md:mt-0">
            <label className="block mb-2">Your Email</label>

            <input
              className="w-full border border-gray-300 rounded py-3 px-4"
              type="email"
              name="Email"
              placeholder="Your Email"
              required
            />
          </div>
        </div>

        <div className="my-6 text-left">
          <label className="block mb-2">Message</label>

          <textarea
            className="w-full border border-gray-300 rounded py-3 px-4 h-48 resize-none"
            name="Message"
            placeholder="Message"
            required
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-blue-600 text-white py-3 px-12 mb-10 rounded hover:bg-blue-700 transition"
        >
          {result ? result : "Send Message"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Contact;
