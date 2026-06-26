import React, { useState, useEffect } from "react";
import { assets, projectsData } from "../assets/assets";
import { motion } from "framer-motion";

const Project = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(4);
      } else if (window.innerWidth >= 768) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };

    updateCardsToShow();

    window.addEventListener("resize", updateCardsToShow);

    return () => {
      window.removeEventListener("resize", updateCardsToShow);
    };
  }, []);

  const nextProject = () => {
    if (currentIndex < projectsData.length - cardsToShow) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevProject = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(projectsData.length - cardsToShow);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden"
      id="Projects"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Projects
        <span className="underline underline-offset-4 decoration-1 font-light ml-2">
          Completed
        </span>
      </h1>

      <p className="text-center text-gray-500 mb-8 max-w-80 mx-auto">
        Crafting Spaces, Building Legacies - Explore Our Portfolio
      </p>

      {/* Slider Buttons */}
      <div className="flex justify-end items-center mb-8">
        <button
          onClick={prevProject}
          className="p-3 bg-gray-200 rounded mr-2 hover:bg-gray-300 transition"
        >
          <img src={assets.left_arrow} alt="Previous" />
        </button>

        <button
          onClick={nextProject}
          className="p-3 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          <img src={assets.right_arrow} alt="Next" />
        </button>
      </div>

      {/* Slider */}
      <div className="overflow-hidden">
        <div
          className="flex gap-8 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${
              (currentIndex * 100) / cardsToShow
            }%)`,
          }}
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="relative flex-shrink-0 w-full sm:w-1/2 lg:w-1/4"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto mb-14 rounded-lg"
              />

              <div className="absolute left-0 right-0 bottom-5 flex justify-center">
                <div className="inline-block bg-white w-3/4 px-4 py-3 shadow-lg rounded-md">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {project.title}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {project.price}
                    <span className="px-2">|</span>
                    {project.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Project;