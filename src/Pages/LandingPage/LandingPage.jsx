

const LandingPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen font-sans p-8">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-16 px-6">
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight mb-4">
          Stay on top of your tasks with ease
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Simplify your workflow and never miss a deadline with our Task Management System.
        </p>
        <a
          href="#features"
          className="bg-yellow-500 text-gray-900 py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-600 transition-all duration-300"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Task Categorization</h3>
            <p className="text-gray-600">
              Organize your tasks into categories like "To-Do", "In Progress", and "Completed" to stay on track.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Drag & Drop Reordering</h3>
            <p className="text-gray-600">
              Easily reorder tasks with drag-and-drop functionality, making it intuitive and seamless to update your progress.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Real-Time Updates</h3>
            <p className="text-gray-600">
              Stay updated with real-time task progress and database persistence. No more worrying about losing progress!
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Start Managing Your Tasks Today</h2>
          <p className="text-lg mb-6">
            Sign up today and start organizing your tasks like a pro. We make task management easy and efficient.
          </p>
          <a
            href="#"
            className="bg-yellow-500 text-gray-900 py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-600 transition-all duration-300"
          >
            Join Now
          </a>
        </div>
      </section>

     
    </div>
    );
};

export default LandingPage;